//Module : gameBoard
const gameBoard = (() => {

const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');

return {
  huPlayer,
  aiPlayer,
  winCombos,
  cells
};

})();


//Module : Game
const game = (() => {

  let origBoard;



  const turnClick = (square) => {
    if (typeof origBoard[square.target.id] == 'number') {
      turn(square.target.id, gameBoard.huPlayer)
      if (!checkTie()) turn(bestSpot(), gameBoard.aiPlayer);
    }
  }

  // startGame();
  const startGame = () => {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < gameBoard.cells.length; i++) {
      gameBoard.cells[i].innerText = '';
      gameBoard.cells[i].style.removeProperty('background-color');
      gameBoard.cells[i].addEventListener('click', turnClick, false);
    }
  }




  return {
    startGame
  };

})();


document.getElementById("btn").addEventListener("click", () => {
  game.startGame()

});
