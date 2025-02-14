function buildPlayerTurnText(turn) {
  const { cell, player } = turn;
  const { row, col } = cell;
  return `Player ${player} played position ${row},${col}.`;
}

export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.cell.row}${turn.cell.col}`}>
          {buildPlayerTurnText(turn)}
        </li>
      ))}
    </ol>
  );
}
