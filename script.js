const diceEl = document.querySelector(".dice");

const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const btnNew = document.querySelector(".new-game");

const total = [0, 0, 0];

let activePlayer = 1;
let score = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(".player--1").classList.toggle("player--active");
  document.querySelector(".player--2").classList.toggle("player--active");
};

const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNumber = randomNumber();
    console.log(diceNumber);

    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${diceNumber}.png`;

    // When Dice number is not 1
    if (diceNumber !== 1) {
      score += diceNumber;
      document.querySelector(`.score--${activePlayer}`).textContent = score;
    }
    // When Dice number is 1
    else {
      document.querySelector(`.score--${activePlayer}`).textContent = 0;

      score = 0;
      activePlayer = activePlayer === 1 ? 2 : 1;

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    total[activePlayer] += score;
    score = 0;
    document.querySelector(`.total--${activePlayer}`).textContent =
      total[activePlayer];
    document.querySelector(`.score--${activePlayer}`).textContent = 0;

    if (total[activePlayer] >= 50) {
      document.querySelector(`.player--${activePlayer}`).classList.add("won");
      playing = false;
    } else {
      switchPlayer();
      activePlayer = activePlayer === 1 ? 2 : 1;
    }
  }
});

btnNew.addEventListener("click", function () {
  document.querySelector(".total--1").textContent = 0;
  document.querySelector(".total--2").textContent = 0;
  document.querySelector(".score--1").textContent = 0;
  document.querySelector(".score--2").textContent = 0;

  document.querySelector(".player--1").classList.add("player--active");
  document.querySelector(".player--2").classList.remove("player--active");

  document.querySelector(`.player--${activePlayer}`).classList.remove("won");

  playing = true;
  activePlayer = 1;
  score = 0;
  total[1] = 0;
  total[2] = 0;

  diceEl.classList.add("hidden");
});
