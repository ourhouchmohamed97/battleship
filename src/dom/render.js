export function renderBoard(gameboard, container, { isEnemy = false, onCellClick = null } = {}) {
    container.innerHTML = '';
    const boardSize = 10;
  
    const shipCoords = new Set();
    gameboard.ships.forEach((entry) => {
      entry.coords.forEach((key) => shipCoords.add(key));
    });
  
    for (let y = 0; y < boardSize; y += 1) {
      for (let x = 0; x < boardSize; x += 1) {
        const key = `${x},${y}`;
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;
  
        const wasAttacked = gameboard.attackedCoords.has(key);
        const hasShip = shipCoords.has(key);
  
        if (wasAttacked && hasShip) {
          cell.classList.add('hit');
        } else if (wasAttacked && !hasShip) {
          cell.classList.add('miss');
        } else if (hasShip && !isEnemy) {
          cell.classList.add('ship');
        }
  
        if (isEnemy && onCellClick && !wasAttacked) {
          cell.addEventListener('click', () => onCellClick([x, y]));
        }
  
        container.appendChild(cell);
      }
    }
  }