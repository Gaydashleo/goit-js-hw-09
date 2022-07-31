function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");

const intervalColorChange = 1000;
let intervalId = null;

buttonStart.addEventListener('click', colorChange);
buttonStop.addEventListener('click', colorStop);

function colorChange() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
  }, intervalColorChange);
  buttonStart.disabled = true;
  };
  
function colorStop() {
  clearInterval(intervalId);
  buttonStart.disabled = false;
};
