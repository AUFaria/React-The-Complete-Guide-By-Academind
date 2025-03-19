import { useRef, useState } from "react";

export default function Player() {
 const playerNameInputRef = useRef();

 const [playerName, setPlayerName] = useState("");

 // - WARNING -
 function handleSetNameButtonClick() {
  setPlayerName(playerNameInputRef.current.value); // Reading values directly from the DOM => OK
  playerNameInputRef.current.value = ""; // Directly manipulating the DOM => Not recommended!!!
 }

 return (
  <section id="player">
   <h2>Welcome {playerName ?? "unknown entity"}</h2>
   <p>
    <input ref={playerNameInputRef} type="text" />
    <button onClick={handleSetNameButtonClick}>Set Name</button>
   </p>
  </section>
 );
}
