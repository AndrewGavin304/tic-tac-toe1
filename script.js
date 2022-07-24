const gameBoard = (() => {
  const boardArray = Array(9).fill('x');
  const displayBoard = () => {
    boardArray.forEach((element, i)=> {
      const gameBoardCell = document.querySelector(`#cell-${i}`)
      gameBoardCell.textContent = element;
    })
  }
  return { displayBoard }
})();

const playerFactory = (id) => {
  return { id };
};

const gameMaster = (() => {
  // gameBoard.displayBoard();
})

gameBoard.displayBoard()

const user = playerFactory('user');
const cpu = playerFactory('cpu');