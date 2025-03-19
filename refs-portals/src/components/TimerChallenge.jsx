import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
 const timerRef = useRef();
 const resultDialogRef = useRef();

 //  const [isTimerStarted, setIsTimerStarted] = useState(false);
 //  const [isTimerFinished, setIsTimerFinished] = useState(false);

 const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

 const isTimerRunning = timeRemaining > 0 && timeRemaining < targetTime * 1000;

 if (timeRemaining <= 0) {
  clearInterval(timerRef.current);
  resultDialogRef.current.open();
 }

 //  function handleStartChallenge() {
 //   setIsTimerStarted(true);

 //   timerRef.current = setTimeout(() => {
 //    setIsTimerFinished(true);
 //    //    resultDialogRef.current.showModal(); // Native method from the element attached to ref.
 //    resultDialogRef.current.open(); // Method exposed by the component using useImperativeHandle.
 //   }, targetTime * 1000);
 //  }

 function handleStartChallenge() {
  timerRef.current = setInterval(() => {
   setTimeRemaining((previous) => previous - 10);
  }, 10);
 }

 function handleStopChallenge() {
  //   clearTimeout(timerRef.current);
  resultDialogRef.current.open();
  clearInterval(timerRef.current);
 }

 function handleReset() {
  setTimeRemaining(targetTime * 1000);
 }

 return (
  <>
   <ResultModal
    ref={resultDialogRef}
    targetTime={targetTime}
    remainingTime={timeRemaining}
    onReset={handleReset}
   />
   <section className="challenge">
    <h2>{title}</h2>
    <p className="challenge-time">
     {targetTime} second{targetTime > 1 ? "s" : ""}
    </p>
    <p>
     <button
      onClick={isTimerRunning ? handleStopChallenge : handleStartChallenge}>
      {isTimerRunning ? "Stop" : "Start"} Challenge
     </button>
    </p>
    <p className={isTimerRunning ? "active" : ""}>
     {isTimerRunning ? "Timer is running..." : "Timer inactive"}
    </p>
   </section>
  </>
 );
}
