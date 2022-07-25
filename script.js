const gameBoard = (() => {
  const boardArray = Array(9).fill('O');
  const refreshBoard = () => {
    boardArray.forEach((element, i) => {
      const gameBoardCell = document.querySelector(`#cell-${i}`)
      gameBoardCell.textContent = element;
    })
  }

  const placeMarker = () => {
    document.getElementById('game-board').addEventListener('click', event => {
      if (event.target.className === 'game-board__cell') {
        console.log(event.target.id)
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
  gameBoard.placeMarker();
  
})

const userX = playerFactory('userX');
const userO = playerFactory('userO');

gameMaster();
