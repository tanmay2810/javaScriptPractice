"use strict";
console.log("Fundamental part - 2");

// functions

function logger() {
  console.log("logger function");
}

logger();

// arrow function

const loggerMessage = () => console.log("arrow logger function");
loggerMessage();

const calcAverage = (score1, score2, score3) => {
  return ((score1 + score2 + score3) / 3);
};

// console.log(calcAverage(44,23,71));

function checkWinner(dolphineScores, KolasScores) {

  let dolphineAverage = calcAverage(dolphineScores[0], dolphineScores[1], dolphineScores[2]);
  let kolasAverage = calcAverage(KolasScores[0], KolasScores[1], KolasScores[2]);

  if (dolphineAverage > kolasAverage * 2) console.log("Dolpine wins "+dolphineAverage);
  else if (kolasAverage > dolphineAverage * 2) console.log("Kolas wins "+kolasAverage);
  else console.log("No one wins"+ dolphineAverage + ' ' + kolasAverage);

}

checkWinner([44,23,71],[65,54,49])
checkWinner([85,54,41],[23,34,27])
