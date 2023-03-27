"use strict";

let player1Name = prompt("Enter the name of 1st player");
let player2Name = prompt("Enter the name of 2nd player");
let currentPlayer1 = true;

let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

let player1Score = 0;
let player2Score = 0;

let player1CurrentScore = 0;
let player2CurrentScore = 0;

const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const diceImage = document.querySelector(".dice");
const holdScore = document.querySelector(".btn--hold");

const getPlayer1CurrentScore = document.getElementById("current--0");
const getPlayer2CurrentScore = document.getElementById("current--1");

const getPlayer1Score = document.getElementById("score--0");
const getPlayer2Score = document.getElementById("score--1");

document.getElementById("name--0").textContent = player1Name;
document.getElementById("name--1").textContent = player2Name;

getPlayer1Score.textContent = player1Score;
getPlayer2Score.textContent = player2Score;

getPlayer1CurrentScore.textContent = player1CurrentScore;
getPlayer2CurrentScore.textContent = player2CurrentScore;

console.log(diceImage.src);
player1.classList.add("player--active");

newGame.addEventListener("click", () => {
  console.log("new game");
  player1.classList.add("player--active");
  currentPlayer1 = true;

  player1Name = prompt("Enter the name of 1st player");
  player2Name = prompt("Enter the name of 2nd player");

  document.getElementById("name--0").textContent = player1Name;
  document.getElementById("name--1").textContent = player2Name;

  getPlayer1CurrentScore.textContent = 0;
  getPlayer2CurrentScore.textContent = 0;
});

rollDice.addEventListener("click", () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceImage.classList.remove("hidden");
  diceImage.src = `images/dice-${dice}.png`;

  if (currentPlayer1) {
    getPlayer1CurrentScore.textContent =
      Number(getPlayer1CurrentScore.textContent) + dice;
    switchPlayer();

    currentPlayer1 ? currentPlayer1 = false : currentPlayer1 = true;
  } else {
    getPlayer2CurrentScore.textContent =
      Number(getPlayer2CurrentScore.textContent) + dice;
    switchPlayer();

    currentPlayer1 ? currentPlayer1 = false : currentPlayer1 = true;
  }
});

holdScore.addEventListener("click", () => {
  if (getPlayer1CurrentScore.textContent >= 30) {
    getPlayer1Score.textContent = Number(getPlayer1Score.textContent) + 1;
    resetGameScore();
  } else {
    getPlayer2Score.textContent = Number(getPlayer2Score.textContent) + 1;
    resetGameScore();
  }
});

const resetGameScore = () => {
  player1.classList.add("player--active");
  currentPlayer1 = true;

  getPlayer1CurrentScore.textContent = 0;
  getPlayer2CurrentScore.textContent = 0;
};

const switchPlayer = () => {
  if (
    !(player1CurrentScore.textContent === "0" && player2CurrentScore === "0")
  ) {
    if (currentPlayer1) {
      player2.classList.remove("player--active");
      player1.classList.add("player--active");
    } else {
      player1.classList.remove("player--active");
      player2.classList.add("player--active");
    }
  }
};
