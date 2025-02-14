import { useState } from "react";

import { GAME_END_COMBOS } from "./game-end-combos";
import Player from "./components/Player/Player";
import GameOver from "./components/GameOver/GameOver";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/*
  Acts as a 'helper' function. Located outside the App() function
  because there is no need to "re-render" everytime 'currentPlayer'
  is updated.
*/
function deriveActivePlayer(gameTurnsArray) {
  let currentPlayer = "X";

  if (gameTurnsArray.length > 0 && gameTurnsArray[0].player === "X")
    currentPlayer = "O";

  return currentPlayer;
}

function copyGameBoard(gameBoardState) {
  return [...gameBoardState.map((innerArray) => [...innerArray])];
}

function deriveGameBoard(gameTurnsArray) {
  let gameBoard = copyGameBoard(INITIAL_GAME_BOARD);

  for (const turn of gameTurnsArray) {
    const { cell, player } = turn;
    const { row, col } = cell;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoardArray, playersMapObject) {
  let winner;

  for (const combo of GAME_END_COMBOS) {
    const firstCellSymbol = gameBoardArray[combo[0].row][combo[0].column];
    const secondCellSymbol = gameBoardArray[combo[1].row][combo[1].column];
    const thirdCellSymbol = gameBoardArray[combo[2].row][combo[2].column];

    if (
      firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) {
      winner = playersMapObject[firstCellSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [turns, setTurns] = useState([]);

  /*
    'activePlayer' has become a derived state
    * React Best Pratice: Manage as little state as possible,
      deriving exisiting states when deemed fit.
  */

  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(turns);

  /*
    'initialGameBoard' is passed as reference to local variable
    'gameBoard'. Using 'gameBoard[row][col] = player' inside the
    'forof' loop below >REWRITES< the original 'initialGameBoard'
    constant.

    'gameBoard' needs to be assigned a deep copy (using spread operator '...'
    both on the ~outer~ array and on the ~inner~ arrays by calling Array.map()
    on them) of 'initialGameBoard' in order to maintain the pristine state of 
    'initialGameBoard' while ~resetting~ (hence, ~mutating~) the 'gameBoard' 
    local variable.
  */

  // let gameBoard = initialGameBoard;

  /*
    Moved outside App(); became a helper function (derived state)
  */

  // let gameBoard = copyGameBoard(initialGameBoard);

  // for (const turn of turns) {
  //   const { cell, player } = turn;
  //   const { row, col } = cell;

  //   gameBoard[row][col] = player;
  // }

  const gameBoard = deriveGameBoard(turns);

  /*
    Moved outside App(); became a helper function (derived state)
  */

  // let winner;

  // for (const combo of GAME_END_COMBOS) {
  //   const firstCellSymbol = gameBoard[combo[0].row][combo[0].column];
  //   const secondCellSymbol = gameBoard[combo[1].row][combo[1].column];
  //   const thirdCellSymbol = gameBoard[combo[2].row][combo[2].column];

  //   if (
  //     firstCellSymbol &&
  //     firstCellSymbol === secondCellSymbol &&
  //     firstCellSymbol === thirdCellSymbol
  //   ) {
  //     winner = players[firstCellSymbol];
  //   }
  // }

  const winner = deriveWinner(gameBoard, players);

  const isDraw = turns.length === 9 && !winner;

  function handleActivePlayerMove(rowIndex, colIndex) {
    /*
      'activePlayer' has become a derived state
    */

    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X"
    // );

    setTurns((previousTurns) => {
      const currentPlayer = deriveActivePlayer(previousTurns);

      const turnsCopy = [
        { cell: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...previousTurns,
      ];

      return turnsCopy;
    });
  }

  function handleRestartBtnClick() {
    setTurns([]);
  }

  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers,
        [symbol]: playerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestartBtnClick={handleRestartBtnClick} />
        )}
        <GameBoard
          board={gameBoard}
          turns={turns}
          onActivePlayerMove={handleActivePlayerMove}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
