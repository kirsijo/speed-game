const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let startSound;
let endSound;

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => circleClicked(i));
});

const circleClicked = (i) => {
  console.log("clicked circle was:", i);
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGame = () => {
  startButton.style.display = "none";
  stopButton.style.display = "inline";
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }
  console.log("game started");

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  console.log("active circle", active);
  timer = setTimeout(startGame, pace);
  pace = pace - 7;
  if (rounds >= 5) {
    endGame();
  }
  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  console.log("game ended");
  endGameMusic();
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  if (score >= 10) {
    resultText.textContent = `Your final score was ${score}. Raccoons love you!`;
  } else {
    resultText.textContent = `Your score was ${score}. Too bad. Raccoons are still hungry.`;
  }
};

const reloadGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const startGameMusic = () => {
  startSound = new sound("sounds/banjos.mp3");
  startSound.play();
};

const endGameMusic = () => {
  endSound = new sound("sounds/gameover.mp3");
  startSound.stop();
  endSound.play();
};

startButton.addEventListener("click", startGameMusic);
