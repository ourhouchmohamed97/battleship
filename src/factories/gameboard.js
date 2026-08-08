import { createShip } from './ship.js';

function coordKey(coord) {
  return `${coord[0]},${coord[1]}`;
}

export function createGameboard() {
  return {
    ships: [],          // { ship, coords: Set of "x,y" keys }
    missedAttacks: [],  // array of [x, y]
    attackedCoords: new Set(), // every coord ever attacked (hit or miss)

    placeShip(coordinates) {
      const ship = createShip(coordinates.length);
      const coords = new Set(coordinates.map(coordKey));
      this.ships.push({ ship, coords });
      return ship;
    },

    receiveAttack(coordinate) {
      const key = coordKey(coordinate);

      if (this.attackedCoords.has(key)) {
        return false; // illegal move, already attacked
      }
      this.attackedCoords.add(key);

      const target = this.ships.find((entry) => entry.coords.has(key));

      if (target) {
        target.ship.hit();
        return true; // hit
      }

      this.missedAttacks.push(coordinate);
      return false; // miss
    },

    allShipsSunk() {
      return this.ships.every((entry) => entry.ship.isSunk());
    }
  };
}