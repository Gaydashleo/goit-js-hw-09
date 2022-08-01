import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let chooseDate = null;

const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");
const buttonStart = document.querySelector("button[data-start]");

buttonStart.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if(Date.now() >= selectedDates[0]) {
      buttonStart.disabled = true;
      window.alert("Please choose a date in the future");
          } else {
      chooseDate = selectedDates[0].getTime();
      buttonStart.disabled = false;
      return;
          };
    
      console.log(selectedDates[0]);
  }
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return
    }
    const startTime = chooseDate;
    this.isActive = true;

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const componentsTime = convertMs(deltaTime);
      const { days, hours, minutes, seconds } = componentsTime; 
       if (deltaTime <= 0) {
        return;
    };
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
  },
  
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    
  }
}

buttonStart.addEventListener('click', () => { timer.start() });
flatpickr("input#datetime-picker", options);

// class Timer {
//   constructor() {
//     this.intervalId = null;
//     this.isActive = false;
//     buttonStart.disabled = true;
//   }
//     start() {
//     if (this.isActive) {
//       return
//       }
//     const startTime = Date.now();
//     this.isActive = true;

//       this.intervalId = setInterval(() => {
//         const currentTime = Date.now();
//         const deltaTime = startTime - currentTime;
//         const { days, hours, minutes, seconds } = convertMs(deltaTime);
//         this.wrightComponentTime({ days, hours, minutes, seconds });
//         if (  deltaTime <= 0 ) {
//           this.stop();
//             }
//         console.log(`${days}:${hours}:${minutes}:${seconds}`);
//       }, 1000);
//   }
//     wrightComponentTime({ days, hours, minutes, seconds }) {
//       daysEl.textContent = days;
//       hoursEl.textContent = hours;
//       minutesEl.textContent = minutes;
//       secondsEl.textContent = seconds;
//   }

//     stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     }
//   }
// const timer = new Timer();
// buttonStart.addEventListener('click', () => { timer.start() });
// flatpickr("input#datetime-picker", options);