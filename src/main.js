import { createPlayer } from './factories/player.js';
import { renderBoard } from './dom/render.js';

const boardSize = 10;

function placeShipsRandomly(player) {
  const shipLengths = [5, 4, 3, 3, 2];

  shipLengths.forEach((length) => {
    let placed = false;
    while (!placed) {
      const horizontal = Math.random() < 0.5;
      const startX = Math.floor(Math.random() * boardSize);
      const startY = Math.floor(Math.random() * boardSize);

      const coords = [];
      for (let i = 0; i < length; i += 1) {
        const x = horizontal ? startX + i : startX;
        const y = horizontal ? startY : startY + i;
        coords.push([x, y]);
      }

      const inBounds = coords.every(([x, y]) => x < boardSize && y < boardSize);
      const overlaps = coords.some(([x, y]) =>
        player.gameboard.ships.some((entry) => entry.coords.has(`${x},${y}`))
      );

      if (inBounds && !overlaps) {
        player.gameboard.placeShip(coords);
        placed = true;
      }
    }
  });
}

const humanPlayer = createPlayer('real');
const computerPlayer = createPlayer('computer');

placeShipsRandomly(humanPlayer);
placeShipsRandomly(computerPlayer);

const playerBoardEl = document.getElementById('player-board');
const enemyBoardEl = document.getElementById('enemy-board');
const messageEl = document.getElementById('message');

let gameOver = false;

function renderAll() {
  renderBoard(humanPlayer.gameboard, playerBoardEl, { isEnemy: false });
  renderBoard(computerPlayer.gameboard, enemyBoardEl, {
    isEnemy: true,
    onCellClick: handlePlayerAttack
  });
}

function checkGameOver() {
  if (computerPlayer.gameboard.allShipsSunk()) {
    messageEl.textContent = 'You win! All enemy ships sunk.';
    gameOver = true;
    return true;
  }
  if (humanPlayer.gameboard.allShipsSunk()) {
    messageEl.textContent = 'Computer wins! All your ships sunk.';
    gameOver = true;
    return true;
  }
  return false;
}

function computerTurn() {
  const move = computerPlayer.getRandomLegalMove(humanPlayer);
  computerPlayer.attack(humanPlayer, move);
  renderAll();

  if (checkGameOver()) return;
  messageEl.textContent = 'Your turn — click a cell on the enemy board.';
}

function handlePlayerAttack(coordinate) {
  if (gameOver) return;

  humanPlayer.attack(computerPlayer, coordinate);
  renderAll();

  if (checkGameOver()) return;

  messageEl.textContent = "Computer's turn...";
  setTimeout(computerTurn, 500);
}

renderAll();
messageEl.textContent = 'Your turn — click a cell on the enemy board.';