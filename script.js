'use strict';

const btnNewGame = document.querySelector(`.btn--new`);
const btnRollDice = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);

let current0 = 0;
let current1 = 0;
let score0 = 0;
let score1 = 0;

const fNewGame = function () {
  score0 = 0;
  score0El.textContent = score0;
  score1 = 0;
  score1El.textContent = score1;
  current0 = 0;
  current0El.textContent = current0;
  current1 = 0;
  current1El.textContent = current1;
  diceEl.classList.add(`hidden`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`, `name`);
  player1El.classList.remove(`player--winner`, `name`);
  btnRollDice.disabled = false;
  btnHold.disabled = false;
};

fNewGame();

const fHold = function () {
  const activePlayer = fGetActivePlayer();
  if (activePlayer === 0) {
    score0 += current0;
    score0El.textContent = score0;
    current0 = 0;
    current0El.textContent = current0;
    player0El.classList.remove(`player--active`);
    player1El.classList.add(`player--active`);
  } else {
    score1 += current1;
    score1El.textContent = score1;
    current1 = 0;
    current1El.textContent = current1;
    player1El.classList.remove(`player--active`);
    player0El.classList.add(`player--active`);
  }
};

const fPlayer0Wins = function (player0) {
  if (player0) {
    player0El.classList.add(`player--winner`, `name`);
    score0 += current0;
    score0El.textContent = score0;
  } else {
    player1El.classList.add(`player--winner`, `name`);
    score1 += current1;
    score1El.textContent = score1;
  }
  diceEl.classList.add(`hidden`);
  btnRollDice.disabled = true;
  btnHold.disabled = true;
};

const fGameOperates = function (player0, diceValue) {
  if (player0) {
    current0 += diceValue;
    current0El.textContent = current0;
    if (current0 + score0 >= 100) fPlayer0Wins(true);
  } else {
    current1 += diceValue;
    current1El.textContent = current1;
    if (current1 + score1 >= 100) fPlayer0Wins(false);
  }
};

const fGetActivePlayer = function () {
  return player0El.classList.contains(`player--active`) ? 0 : 1;
};

const fRolledOne = function (player) {
  if (player === 0) current0 = 0;
  else current1 = 0;
  fHold();
};

const fRollDice = function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${diceValue}.png`;
  const activePlayer = fGetActivePlayer();
  if (diceValue !== 1) {
    if (activePlayer === 0) fGameOperates(true, diceValue);
    else fGameOperates(false, diceValue);
  } else fRolledOne(activePlayer);
};

btnRollDice.addEventListener(`click`, fRollDice);

btnHold.addEventListener(`click`, fHold);

btnNewGame.addEventListener(`click`, fNewGame);
