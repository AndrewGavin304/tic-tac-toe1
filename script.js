const gameBoard = (() => {
  const boardArray = Array(9).fill(undefined);
  const refreshBoard = () => {
    boardArray.forEach((element, i) => {
      const gameBoardCell = document.querySelector(`#cell-${i}`)
      gameBoardCell.textContent = element;
    })
  }

  const placeMarker = (user) => {
    document.getElementById('game-board').addEventListener('click', event => {
      if (event.target.className === 'game-board__cell') {
        const targetCell = event.target.id;
        
        // Strips 'cell-' from the cell id, returning a number matching the cell
        const regex = /(?<=cell-)./;
        cellNumArray = targetCell.match(regex)
        cellNum = cellNumArray[0]
        
        if (user === userX) {
          boardArray[cellNum] = 'X';
        }

        else if (user === userO) {
          boardArray[cellNum] = 'O'
        }
        refreshBoard();
  }
})
  }
  return { refreshBoard, placeMarker }
})();

const playerFactory = (id) => {
  return { id };
};

const gameMaster = (() => {
  gameBoard.refreshBoard();
  gameBoard.placeMarker(userX);
  
})

const userX = playerFactory('userX');
const userO = playerFactory('userO');

gameMaster();
