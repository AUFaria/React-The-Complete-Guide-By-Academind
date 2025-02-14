import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onPlayerNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleIsEditingBtnClick() {
    setIsEditing((previousIsEditing) => !previousIsEditing);

    if (isEditing) {
      onPlayerNameChange(symbol, playerName);
    }
  }

  function handlePlayerNameInputChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input
            name="player-name"
            type="text"
            required
            value={playerName}
            onChange={handlePlayerNameInputChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleIsEditingBtnClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
