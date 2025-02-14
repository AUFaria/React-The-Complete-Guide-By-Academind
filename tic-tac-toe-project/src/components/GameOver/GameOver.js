export default function GameOver({ winner, onRestartBtnClick }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} wins!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={onRestartBtnClick}>Go again?</button>
      </p>
    </div>
  );
}
