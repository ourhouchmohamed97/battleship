import { createShip } from '../ship.js';

test('creates a ship with given length and 0 hits', () => {
  const ship = createShip(3);
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
});

test('hit() increases the hit count', () => {
  const ship = createShip(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('isSunk() returns false when hits are below length', () => {
  const ship = createShip(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('isSunk() returns true when hits equal length', () => {
  const ship = createShip(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('isSunk() returns true when hits exceed length (edge case)', () => {
  const ship = createShip(1);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});