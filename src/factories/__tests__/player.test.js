import { createPlayer } from '../player.js';

test('player has a type', () => {
  const player = createPlayer('computer');
  expect(player.type).toBe('computer');
});

test('player has their own gameboard', () => {
  const player = createPlayer();
  expect(player.gameboard).toBeDefined();
  expect(player.gameboard.ships).toEqual([]);
});

test('attack sends coordinates to opponent gameboard', () => {
  const player1 = createPlayer('real');
  const player2 = createPlayer('real');
  player2.gameboard.placeShip([[0, 0]]);

  const result = player1.attack(player2, [0, 0]);
  expect(result).toBe(true);
});

test('getRandomLegalMove never returns a previously attacked coordinate', () => {
  const computer = createPlayer('computer');
  const opponent = createPlayer('real');

  // Fill the board with attacks except one free cell
  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      if (!(x === 5 && y === 5)) {
        opponent.gameboard.receiveAttack([x, y]);
      }
    }
  }

  const move = computer.getRandomLegalMove(opponent);
  expect(move).toEqual([5, 5]);
});

test('getRandomLegalMove returns different coordinates across many calls (no repeats)', () => {
  const computer = createPlayer('computer');
  const opponent = createPlayer('real');
  const attacked = new Set();

  for (let i = 0; i < 50; i += 1) {
    const move = computer.getRandomLegalMove(opponent);
    const key = `${move[0]},${move[1]}`;
    expect(attacked.has(key)).toBe(false);
    attacked.add(key);
    opponent.gameboard.receiveAttack(move);
  }
});