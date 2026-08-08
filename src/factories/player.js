import { createGameboard } from './gameboard.js';

export function createPlayer(type = 'real') {
  return {
    type,
    gameboard: createGameboard(),

    attack(opponent, coordinate) {
      return opponent.gameboard.receiveAttack(coordinate);
    },

    getRandomLegalMove(opponent, boardSize = 10) {
      let coord;
      do {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        coord = [x, y];
      } while (opponent.gameboard.attackedCoords.has(`${coord[0]},${coord[1]}`));
      return coord;
    }
  };
}