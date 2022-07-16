"use-strict";

let player1Score;
let currentScore1;
let player2Score;
let currentScore2;
let dice;
let isPlayer1;
const player1Modal = document.querySelector(".player1Box");
const player2Modal = document.querySelector(".player2Box");
const overlay = document.querySelector(".overlay");
const winModal = document.querySelector(".modal");
const playerWinText = document.querySelector(".playerWin");

const updateScore = function (player, score) {
  document.querySelector(player).textContent = score;
};

const switchPlayers = function () {
  isPlayer1 = !isPlayer1;
  player1Modal.classList.toggle("playerInactive");
  player2Modal.classList.toggle("playerInactive");
};

const playerWins = function () {
  overlay.classList.remove("hidden");
  winModal.classList.remove("hidden");
  if (isPlayer1)
    playerWinText.textContent = `Player 1 Wins (${player1Score} points)`;
  else playerWinText.textContent = `Player 2 Wins (${player2Score} points)`;
};

const newGameClcikHandler = function () {
  isPlayer1 = true;
  player1Score = 0;
  currentScore1 = 0;
  player2Score = 0;
  currentScore2 = 0;
  updateScore(".score1", player1Score);
  updateScore(".currentScore1", currentScore1);
  updateScore(".score2", player2Score);
  updateScore(".currentScore2", currentScore2);
  player1Modal.classList.remove("playerInactive");
  player2Modal.classList.add("playerInactive");
};

const holdClickHandler = function () {
  if (isPlayer1) {
    player1Score += currentScore1;
    updateScore(".score1", player1Score);
    if (player1Score >= 100) {
      playerWins();
    }
  } else {
    player2Score += currentScore2;
    updateScore(".score2", player2Score);
    if (player2Score >= 100) {
      playerWins();
    }
  }
  currentScore1 = 0;
  currentScore2 = 0;
  updateScore(".currentScore1", currentScore1);
  updateScore(".currentScore2", currentScore2);
  switchPlayers();
};

const rollDiceClickHandler = function () {
  dice = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(".diceImage").src = `dice-${dice}.png`;
  if (dice == 1) {
    currentScore1 = 0;
    currentScore2 = 0;
    holdClickHandler();
  } else if (isPlayer1) {
    currentScore1 += dice;
    updateScore(".currentScore1", currentScore1);
  } else {
    currentScore2 += dice;
    updateScore(".currentScore2", currentScore2);
  }
};

const playAgainClickHandler = function () {
  overlay.classList.add("hidden");
  winModal.classList.add("hidden");
  newGameClcikHandler();
};

newGameClcikHandler();

document
  .querySelector(".newGame")
  .addEventListener("click", newGameClcikHandler);

document
  .querySelector(".rollDice")
  .addEventListener("click", rollDiceClickHandler);

document.querySelector(".hold").addEventListener("click", holdClickHandler);

document
  .querySelector(".playAgainBtn")
  .addEventListener("click", playAgainClickHandler);
