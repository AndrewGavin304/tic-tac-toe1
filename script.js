const playerFactory = (id) => {
  return { id };
};

const userX = playerFactory('X');
const userO = playerFactory('O');

const gameBoard = (() => {
  let boardArray = Array(9).fill(undefined);

  const getValue = (arrayIndex) => boardArray[arrayIndex];

  const refreshBoard = () => {
    boardArray.forEach((element, i) => {
      const gameBoardCell = document.querySelector(`#cell-${i}`)
      gameBoardCell.textContent = element;
    })
  }

  const isEmpty = (targetArrayIndex) => {
    return boardArray[targetArrayIndex] ? false : true;
  }

  const placeMarker = (user, targetArrayIndex) => {
  
        if (user === userX) {
          boardArray[targetArrayIndex] = 'X';
        }

        else if (user === userO) {
          boardArray[targetArrayIndex] = 'O'
        }

        refreshBoard();
        if (gameMaster.checkForWinner()){

        };
  }

  return { refreshBoard, placeMarker, isEmpty, getValue }
})();

const gameMaster = (() => {
  gameBoard.refreshBoard();
  let currentPlayer = userX;

  document.getElementById('game-board').addEventListener('click', event => {
    if (event.target.className === 'game-board__cell') {
      const targetCell = event.target.id;
      
      // Strips 'cell-' from the cell id, returning a number matching the cell
      const regex = /(?<=cell-)./;
      cellNumAsArray = targetCell.match(regex)
      cellArrayIndex = cellNumAsArray[0]


      if (gameBoard.isEmpty(cellArrayIndex) === true) {
        gameBoard.placeMarker(currentPlayer, cellArrayIndex);
        switchActivePlayer(currentPlayer)
      }
    }
  })

  function switchActivePlayer(user) {
    if (user === userX) {
      return currentPlayer = userO;
    }
    else return currentPlayer = userX;
  }

  const isX = (val) => val === 'X';
  const isO = (val) => val === 'O';

  function checkRow() {
    for (let i = 0; i < 3; i++){
      let row = [];
      for (let j = i*3; j < (i*3 + 3); j++) {
        row.push(gameBoard.getValue(j));
        if ((row.every(isX) || row.every(isO)) & row.length == 3){
          return true;
        }
      }
    }
    return false;
  }

  function checkColumn() {
    for (let i = 0; i < 3; i++){
      let column = [];
      for (let j = i; j < 9; j = j+3) {
        column.push(gameBoard.getValue(j));
        if ((column.every(isX) || column.every(isO)) & column.length == 3){
          return true;
        }
      }
    }
    return false;
  }

  function checkDiagonal() {
    let cell0 = gameBoard.getValue(0);
    let cell2 = gameBoard.getValue(2);
    let cell4 = gameBoard.getValue(4);
    let cell6 = gameBoard.getValue(6);
    let cell8 = gameBoard.getValue(8);
    let diagonal1 = [cell0, cell4, cell8];
    let diagonal2 = [cell2, cell4, cell6];
    if (diagonal1.every(isX) || diagonal2.every(isX) || diagonal1.every(isO) || diagonal2.every(isO)) {
      return true;
    }
  }

  function checkForWinner() {
    if (checkRow() || checkColumn() || checkDiagonal()) {
      declareWinner(currentPlayer)
      return true;
    }
  }

  function declareWinner(player){
    alert(`${player.id} wins!`)
  }
  
  return { checkRow, checkColumn, checkDiagonal, checkForWinner }
})();
