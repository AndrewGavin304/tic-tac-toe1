const playerFactory = ((name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;
  return { getMarker, getName }

});

let playerX = playerFactory("X", 'X')
let playerO = playerFactory("O", 'O')

const gameBoard = (() => {
  let boardArray = Array(9).fill('');

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

  const placeMarker = (playerMarker, targetArrayIndex) => {
    boardArray[targetArrayIndex] = playerMarker;
  
        // if (player.getMarker() === 'X') {
        //   boardArray[targetArrayIndex] = 'X';
        // }

        // else if (player.getMarker() === 'O') {
        //   boardArray[targetArrayIndex] = 'O'
        // }

        refreshBoard();
        if (gameMaster.checkForWinner()){

        };
  }

  const resetGame = document.getElementById("reset-game");

  resetGame.addEventListener('click', event => {
    resetBoard();
  })

  const resetBoard = () => {
    boardArray.fill('');
    refreshBoard();
  }

  return { refreshBoard, placeMarker, isEmpty, getValue, resetBoard }
})();

const gameMaster = (() => {
  gameBoard.refreshBoard();
  let currentPlayer = playerX;

  document.getElementById('game-board').addEventListener('click', event => {
    if (event.target.className === 'game-board__cell') {
      const targetCell = event.target.id;
      
      // Strips 'cell-' from the cell id, returning a number matching the cell
      const regex = /(?<=cell-)./;
      cellNumAsArray = targetCell.match(regex)
      cellArrayIndex = cellNumAsArray[0]


      if (gameBoard.isEmpty(cellArrayIndex) === true) {
        gameBoard.placeMarker(currentPlayer.getMarker(), cellArrayIndex);
        switchActivePlayer(currentPlayer)
      }
    }
  })

  const newGame = document.getElementById("new-game");

  newGame.addEventListener('click', event => {
    gameBoard.resetBoard();
    // let newGameMenu = document.getElementById("new-game-form-wrapper");
    // newGameMenu.classList.toggle("new-game-form-wrapper_show");
    // let submitPlayerName = document.getElementById("submit-player-name");
    // submitPlayerName.addEventListener('click', event => {
    //   playerX.changeName("lmao")
    //   playerO.name = document.getElementById("player-o-name").value;
    // })

  })

  function switchActivePlayer(player) {
    console.log(player.getName())
    if (player === playerX){
      currentPlayer = playerO;
    }
    else {
      currentPlayer = playerX;
    }
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
    alert(`${player.getName()} wins!`)
  }
  
  return { checkRow, checkColumn, checkDiagonal, checkForWinner }
})();

