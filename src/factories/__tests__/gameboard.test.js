import { createGameboard } from '../gameboard.js';

test('placeShip creates a ship occupying given coordinates', () => {
  const gameboard = createGameboard();
  const ship = gameboard.placeShip([[0, 0], [0, 1], [0, 2]]);
  expect(ship.length).toBe(3);
});

test('receiveAttack registers a hit on a ship at that coordinate', () => {
  const gameboard = createGameboard();
  const ship = gameboard.placeShip([[0, 0], [0, 1]]);
  gameboard.receiveAttack([0, 0]);
  expect(ship.hits).toBe(1);
});

test('receiveAttack records a miss when no ship is at that coordinate', () => {
  const gameboard = createGameboard();
  gameboard.placeShip([[0, 0], [0, 1]]);
  gameboard.receiveAttack([5, 5]);
  expect(gameboard.missedAttacks).toContainEqual([5, 5]);
});

test('receiveAttack does not record a miss on a hit', () => {
  const gameboard = createGameboard();
  gameboard.placeShip([[0, 0]]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.missedAttacks.length).toBe(0);
});

test('receiveAttack returns false for a repeated attack (illegal move)', () => {
  const gameboard = createGameboard();
  gameboard.placeShip([[0, 0]]);
  gameboard.receiveAttack([0, 0]);
  const result = gameboard.receiveAttack([0, 0]);
  expect(result).toBe(false);
});

test('allShipsSunk returns false when a ship is still afloat', () => {
  const gameboard = createGameboard();
  gameboard.placeShip([[0, 0], [0, 1]]);
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk returns true when every ship is sunk', () => {
  const gameboard = createGameboard();
  gameboard.placeShip([[0, 0]]);
  gameboard.placeShip([[1, 1], [1, 2]]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 1]);
  gameboard.receiveAttack([1, 2]);
  expect(gameboard.allShipsSunk()).toBe(true);
});