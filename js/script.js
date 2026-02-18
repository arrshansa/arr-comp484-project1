var millerSeconds = 0;
var isRunning = false;
var intervalId = null;

var millerDisplay = document.getElementById("millerTime");
var earthDisplay = document.getElementById("earthTime");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resetBtn = document.getElementById("resetBtn");

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function formatMillerTime(totalSeconds) {
  var h = Math.floor(totalSeconds / 3600);
  var m = Math.floor((totalSeconds % 3600) / 60);
  var s = Math.floor(totalSeconds % 60);
  return pad(h) + ":" + pad(m) + ":" + pad(s);
}

function convertToEarthTime(millerSecs) {
  var earthHours = millerSecs * 17;
  var earthDays = Math.floor(earthHours / 24);
  var earthYears = Math.floor(earthDays / 365);
  var remainingDays = earthDays % 365;
  var remainingHours = Math.floor(earthHours % 24);
  return earthYears + "y " + remainingDays + "d " + remainingHours + "h";
}

function tick() {
  millerSeconds++;
  millerDisplay.textContent = formatMillerTime(millerSeconds);
  earthDisplay.textContent = convertToEarthTime(millerSeconds);
}

document.addEventListener("keydown", function (e) {
  const key = e.key.toLowerCase();
  if (key === "s") startBtn.click();
  if (key === "p") pauseBtn.click();
  if (key === "r") resetBtn.click();
});

startBtn.addEventListener("click", function () {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(tick, 1000);
  }
});

pauseBtn.addEventListener("click", function () {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
});

resetBtn.addEventListener("click", function () {
  isRunning = false;
  clearInterval(intervalId);
  millerSeconds = 0;
  millerDisplay.textContent = "00:00:00";
  earthDisplay.textContent = "0y 0d 0h";
});
