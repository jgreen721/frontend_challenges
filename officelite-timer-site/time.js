const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
function countDown() {
  let clear = setTimeout(countDown, 1000);

  // console.log("COUNTDOWN!!");
  let days = daysEl.innerHTML;
  let hours = hoursEl.innerHTML;
  let minutes = minutesEl.innerHTML;
  let seconds = secondsEl.innerHTML;

  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
    if (minutes < 0) {
      minutes = 59;
      hours--;
      if (hours < 0) {
        hours = 23;
        days--;
        if (days < 0) {
          hours = 0;
          minutes = 0;
          seconds = 0;
          daysEl.innerHTML = days.toString().padStart(2, "0");
          hoursEl.innerHTML = hours.toString().padStart(2, "0");
          minutesEl.innerHTML = minutes.toString().padStart(2, "0");
          secondsEl.innerHTML = seconds.toString().padStart(2, "0");
          console.log("Yay!!!!");
          clearTimeout(clear);
        }
      }
    }
  }
  daysEl.innerHTML = days.toString().padStart(2, "0");
  hoursEl.innerHTML = hours.toString().padStart(2, "0");
  minutesEl.innerHTML = minutes.toString().padStart(2, "0");
  secondsEl.innerHTML = seconds.toString().padStart(2, "0");
}

function setCurTime() {
  let currDate = new Date(Date.now());

  // let presentDay = myDate
  let presentDay = parseInt(
    JSON.stringify(currDate).split("-")[2].split("T")[0]
  );

  var currTime = new Date()
    .toTimeString()
    .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  // console.log(currTime);
  currTime = currTime.split(":");

  let presentHour = currTime[0];
  let presentMinutes = currTime[1];
  let presentSeconds = currTime[2];
  let currDayDifference = 31 - presentDay;
  let currDaysLeft = currDayDifference + 3;
  // currDaysLeft = 28 - 27;
  let currHoursLeft = 24 - presentHour;
  // currHoursLeft = 24 - 23;
  let currMinutesLeft = 60 - presentMinutes;
  // currMinutesLeft = 60 - 58;
  let currSecondsLeft = 60 - presentSeconds;
  // console.log(presentDay, presentHour, presentMinutes, presentSeconds);

  daysEl.innerHTML = currDaysLeft.toString().padStart(2, "0");
  hoursEl.innerHTML = currHoursLeft.toString().padStart(2, "0");
  minutesEl.innerHTML = currMinutesLeft.toString().padStart(2, "0");
  secondsEl.innerHTML = currSecondsLeft.toString().padStart(2, "0");

  countDown();
}

setCurTime();
