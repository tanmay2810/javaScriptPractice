"use strict";
let secrectNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let score = document.querySelector(".score").textContent;
console.log(secrectNumber);

document.querySelector(".again").addEventListener("click", () => {
  document.querySelector(".score").textContent = score;
  secrectNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secrectNumber);
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});

document.querySelector(".check").addEventListener("click", () => {
  console.log("in click fun");
  let guess = document.querySelector(".guess").value;
  if (score > 0) {
    if (!guess) {
      document.querySelector(".message").textContent = "No number";
    } else if (Number(guess) === secrectNumber) {
      document.querySelector(".message").textContent = "Correct guess!!!";
      document.querySelector(".number").textContent = guess;
      document.querySelector(".score").textContent = ++score;
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
    } else if (!(Number(guess) === secrectNumber)) {
      Number(guess) > secrectNumber
        ? (document.querySelector(".message").textContent =
            "Guess is greater than secreat number")
        : (document.querySelector(".message").textContent =
            "Guess is less than secreat number");
      document.querySelector(".score").textContent = --score;
    } else {
      console.log("try again");
    }
  } else {
    document.querySelector(".message").textContent = "You lost the game";
  }
});
