export default function GameBoard({ board, onActivePlayerMove }) {
  /*
    Derived state: Main state logic is defined in App.js,
    in here, we "modify" the state to fit this components need.
  */

  /* 
    State was lifted up to App.js, in order to properly manage states
    shared between GameBoard.js and Log.js components
  */

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function copyGameBoard(gameBoardState) {
  //     return [...gameBoardState.map((innerArray) => [...innerArray])];
  //   }

  //   function handleCellBtnClick(rowIndex, colIndex) {
  //     setGameBoard((previousGameBoard) => {
  //       const gameBoardCopy = copyGameBoard(previousGameBoard);
  //       gameBoardCopy[rowIndex][colIndex] = activePlayerSymbol;
  //       return gameBoardCopy;
  //     });

  //     onActivePlayerMove();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onActivePlayerMove(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
