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


  const checkTie = () => {
    if (emptySquares().length == 0) {
      for (var i = 0; i < gameBoard.cells.length; i++) {
        gameBoard.cells[i].style.backgroundColor = "green";
        gameBoard.cells[i].removeEventListener('click', turnClick, false);
      }
      declareWinner("Tie Game!")
      return true;
    }
    return false;
  }


  const minimax = (newBoard, player) => {
  	var availSpots = emptySquares();

  	if (checkWin(newBoard, gameBoard.huPlayer)) {
  		return {score: -10};
  	} else if (checkWin(newBoard, gameBoard.aiPlayer)) {
  		return {score: 10};
  	} else if (availSpots.length === 0) {
  		return {score: 0};
  	}
  	var moves = [];
  	for (var i = 0; i < availSpots.length; i++) {
  		var move = {};
  		move.index = newBoard[availSpots[i]];
  		newBoard[availSpots[i]] = player;

  		if (player == gameBoard.aiPlayer) {
  			var result = minimax(newBoard, gameBoard.huPlayer);
  			move.score = result.score;
  		} else {
  			var result = minimax(newBoard, gameBoard.aiPlayer);
  			move.score = result.score;
  		}

  		newBoard[availSpots[i]] = move.index;

  		moves.push(move);
  	}

  	var bestMove;
  	if(player === gameBoard.aiPlayer) {
  		var bestScore = -10000;
  		for(var i = 0; i < moves.length; i++) {
  			if (moves[i].score > bestScore) {
  				bestScore = moves[i].score;
  				bestMove = i;
  			}
  		}
  	} else {
  		var bestScore = 10000;
  		for(var i = 0; i < moves.length; i++) {
  			if (moves[i].score < bestScore) {
  				bestScore = moves[i].score;
  				bestMove = i;
  			}
  		}
  	}

  	return moves[bestMove];
  }

  return {
    startGame
  };

})();


document.getElementById("btn").addEventListener("click", () => {
  game.startGame()

});
