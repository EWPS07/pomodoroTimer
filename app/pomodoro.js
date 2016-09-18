// ------------------- Option Constructor -------------------
var Option = function(name, pomTime, shortBreak, longBreak) {
  this.name = name;
  this.pomTime = pomTime;
  this.shortBreak = shortBreak;
  this.longBreak = longBreak;
};

// ---------------------- Pomodoro Pre-sets -----------------
var originalPom = new Option('original', 25, 5, 10);
var doublePom = new Option('double', 50, 10, 20);
var fiveTwoOneSeven = new Option('fifty-two-seventeen', 52, null, null);
var customPom = new Option('custom', undefined, undefined, undefined);

// --------------------- Timer Object ------------------------
var timer = {};
timer.useAlertBox;
timer.alertSound = document.createElement('audio');
timer.alertSound.setAttribute('autostart', 'false');
if (timer.alertSound.canPlayType('audio/mpeg')) {
  timer.alertSound.setAttribute('src', "https://www.dropbox.com/s/dlqwxeljxvibqo0/obey.mp3?raw=1");
}
if (timer.alertSound.canPlayType('audio/ogg')) {
  timer.alertSound.setAttribute('src', "https://www.dropbox.com/s/y3pbqc7wdrnw0ez/obey.ogg?raw=1");
}
if (timer.alertSound.canPlayType('audio/wav')) {
  timer.alertSound.setAttribute('src', "https://www.dropbox.com/s/0m4bkjmznhgbt4x/obey%20%281%29-wav.wav?raw=1");
}

timer.current;
timer.time;
timer.wholeTime;
timer.hours;
timer.mins;
timer.secs;
timer.pauseTime;
timer.pauseHours;
timer.pauseMins;
timer.pauseSecs;
timer.onCustom;

// ---------------------- Timer Methods -----------------------
timer.start = function() {
  timer.secs = (timer.time * 60) % 60;
  timer.mins = (((timer.time * 60) - timer.secs) / 60) % 60;
  timer.hours = ((timer.time * 60) - ((timer.mins * 60) + timer.secs)) / (60 * 60);

  if (timer.hours < 1) {
    $('#hours').hide();
  } else {
    $('#hours').show();
  }
  if (timer.secs < 10 && timer.secs > 0) {
    timer.secs = '0' + timer.secs;
  } else {
    timer.secs = timer.secs;
  }
  $('#hours').html(timer.hours).append('<small class="subs">h </small>');
  $('#mins').html(Math.round(timer.mins)).append('<small class="subs">m </small>');
  $('#secs').html(Math.round(timer.secs)).append('<small class="subs">s </small>');
  timer.time *= 60;
  timer.time -= 1;
  timer.time /= 60;
  timer.checkValue();
};

timer.checkValue = function() {
  if (timer.hours === 0 && timer.mins === 0 && timer.secs < 1) {
    timer.bringBack(true);
    if (timer.useAlertBox === true) {
      alert("Beep, beep, beep! Time is up!");
    } else {
      timer.alertSound.play();
    }
    timer.countDownManager(false);
    timer.time = 0;
  }
};
timer.pause = function() {
  timer.countDownManager(false);
  timer.pauseTime = timer.time;
  timer.time = undefined;
};
timer.resume = function() {
  timer.time = timer.pauseTime;
  timer.pauseTime = undefined;
  timer.countDownManager(true);
};

timer.displayTime = function() {
  timer.secs = (timer.time * 60) % 60;
  timer.mins = (((timer.time * 60) - timer.secs) / 60) % 60;
  timer.hours = ((timer.time * 60) - ((timer.mins * 60) + timer.secs)) / (60 * 60);
  if (timer.hours > 0) {
    $('#hours').show();
  } else {
    $('#hours').hide();
  }
  $('#hours').html(timer.hours).append('<small class="subs">h </small>');
  $('#mins').html(Math.round(timer.mins)).append('<small class="subs">m </small>');
  $('#secs').html(Math.round(timer.secs)).append('<small class="subs">s </small>');
  timer.time *= 60;
  timer.time /= 60;
};

timer.reset = function() {
  $('#pause').show();
  timer.countDownManager(false);
  timer.time = timer.wholeTime;
  timer.displayTime();
};

timer.bringBack = function(bool) {
  if (bool === true) {
    $('#startPause').hide();
    $('#plusMinus').show();
    $('#begin').show();
  }
}

// ------------------- Timer Id for setting and clearing interval --------------------
var timerId = null;
timer.countDownManager = function(flag) {
  if (flag === true) {
    timerId = window.setInterval(timer.start, 1000);
  } else if (flag === false) {
    window.clearInterval(timerId);
  }
}

// on load -----------------------------------

$('#appNav, #begin, #startPause, #plusMinus, #clockWidget, #workBreak, #customIns, #timeCount, #landingPage, #aboutPom, #contact, #workBreak').hide();
$('#exitBrowserDis').click(function() {
  if ($('#alertCheck').is(':checked')) {
    timer.useAlertBox = true;
    console.log("it's checked!");
  } else {
    timer.useAlertBox = false;
    console.log("it's not checked!");
  }
  $('#browserDisclaimer').hide();
  $('#appNav, #landingPage').show();
});

// main nav click events ------------------------------
$('#mainBrand').click(function() {
  timer.countDownManager(false);
  $('#aboutPom, #clockWidget, #contact, #browserDisclaimer, #plusMinus, #timeCount, #plusMinus, #startPause, #customIns, #begin, #workBreak').hide();
  $('#play, #landingPage').show();
});

$('#pomTimer').click(function() {
  timer.alertSound.load();
  if (timer.alertSound.oncanplaythrough) {
    timer.alertSound.pause();
  }
  $('#clockWidget').show();
  $('#contact, #aboutPom, #landingPage').hide();
});

$('#appAbout').click(function() {
  timer.countDownManager(false);
  $('#landingPage, #clockWidget, #contact, #browserDisclaimer, #plusMinus, #timeCount, #plusMinus, #startPause, #customIns, #begin, #workBreak').hide();
  $('#aboutPom').show();
});

$('#contactInfo').click(function() {
  timer.countDownManager(false);
  $('#landingPage, #clockWidget, #aboutPom, #browserDisclaimer, #plusMinus, #timeCount, #plusMinus, #startPause, #customIns, #begin, #workBreak').hide();
  $('#contact').show();
});

$('.poms').click(function() {
  $('#timeCount').show();
});

$('.times').click(function() {
  $('#timeCount, #pause').show();
  $('#start, #startPause').hide();
})

$('#original').click(function() {
  timer.onCustom = false;
  timer.countDownManager(false);
  timer.current = originalPom;
  $('#sBreak').show();
  $('#lBreak').text('long break');
  $('#workBreak').show();
  $('#timeCount, #plusMinus, #startPause').hide();
  $('#work').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.pomTime;
    timer.displayTime();
    $('#begin').show();
  })
  $('#sBreak').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.shortBreak;
    timer.displayTime();
    $('#begin').show();
  })
  $('#lBreak').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.longBreak;
    timer.displayTime();
    $('#begin').show();
  })
  timer.wholeTime = timer.time;
});

$('#double').click(function() {
  timer.onCustom = false;
  timer.countDownManager(false);
  timer.current = doublePom;
  $('#sBreak').show();
  $('#lBreak').text('long break');
  $('#workBreak').show();
  $('#timeCount, #plusMinus, #startPause').hide();
  $('#work').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.pomTime;
    timer.displayTime();
    $('#begin').show();
  })
  $('#sBreak').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.shortBreak;
    timer.displayTime();
    $('#begin').show();
  })
  $('#lBreak').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.longBreak;
    timer.displayTime();
    $('#begin').show();
  })
  timer.wholeTime = timer.time;
});

$('#fiveTwoOneSeven').click(function() {
  timer.onCustom = false;
  timer.countDownManager(false);
  timer.current = fiveTwoOneSeven;
  timer.current.break = 17;
  $('#sBreak').hide();
  $('#timeCount, #plusMinus, #startPause').hide();
  $('#lBreak').text('break time');
  $('#workBreak').show();
  $('#work').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.pomTime;
    timer.displayTime();
    $('#begin').show();
  })
  $('#lBreak').click(function() {
    timer.countDownManager(false);
    timer.time = timer.current.break;
    timer.displayTime();
    $('#begin').show();
  })
  timer.wholeTime = timer.time;
});
$('#custom').click(function() {
  timer.onCustom = true;
  timer.countDownManager(false);
  $('#sBreak').show();
  $('#lBreak').text('long');
  $('#workBreak, #startPause').hide();
  $('#plusMinus, #customIns').show();
  $('#exitIns').click(function() {
    $('#customIns').hide();
  })
  customPom.pomTime = 0;
  timer.time = customPom.pomTime;
  timer.displayTime();
});

$('#addTime').click(function() {
  timer.countDownManager(false);
  timer.time = Math.round(timer.time) + 1;
  timer.wholeTime = timer.time;
  timer.displayTime();
  $('#begin').show();
});

$('#minusTime').click(function() {
  timer.countDownManager(false);
  if (timer.time >= 1) {
    timer.time = Math.round(timer.time) - 1;
  } else {
    timer.time = 0;
  }
  timer.wholeTime = timer.time;
  timer.displayTime();
  $('#begin').show();
});

$('#begin').click(function() {
  timer.wholeTime = timer.time;
  timer.countDownManager(true);
  $('#begin, #start, #plusMinus').hide();
  $('#startPause').show();
});

$('#pause').click(function() {
  timer.pause();
  $('#pause').hide();
  $('#start').show();
});

$('#start').click(function() {
  timer.resume();
  $('#start').hide();
  $('#pause').show();
});

$('#reset').click(function() {
  timer.reset();
  if (timer.onCustom === true) {
    $('#plusMinus').show();
  }
  $('#pause').show();
  $('#startPause').hide();
  $('#begin').show();
});