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


  const turn = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
  }


  const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of gameBoard.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {index: index, player: player};
        break;
      }
    }
    return gameWon;
  }

  const gameOver = (gameWon) => {
    for (let index of gameBoard.winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
      gameWon.player == gameBoard.huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < gameBoard.cells.length; i++) {
      gameBoard.cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == gameBoard.huPlayer ? "You win!" : "You lose.");
  }

  const declareWinner = (who) => {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
  }

  const emptySquares = () => {
    return origBoard.filter(s => typeof s == 'number');
  };

  const bestSpot = () => {
    return minimax(origBoard, gameBoard.aiPlayer).index;
  };



  return {
    startGame
  };

})();


document.getElementById("btn").addEventListener("click", () => {
  game.startGame()

});
