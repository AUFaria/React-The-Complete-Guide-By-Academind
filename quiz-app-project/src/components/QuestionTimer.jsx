import { useEffect, useState } from "react";

const PROGRESS_UPDATE_FREQUENCY = 10;

export default function QuestionTimer({ timeout, onTimeout, mode }) {
 const [remainingTime, setRemainingTime] = useState(timeout);

 useEffect(() => {
  const timer = setTimeout(onTimeout, timeout);

  return () => clearTimeout(timer);
 }, [timeout, onTimeout]);

 useEffect(() => {
  const interval = setInterval(() => {
   setRemainingTime(
    (previousRemainingTime) => previousRemainingTime - PROGRESS_UPDATE_FREQUENCY
   );
  }, PROGRESS_UPDATE_FREQUENCY);

  return () => clearInterval(interval);
 }, []);

 return (
  <progress
   id="question-time"
   max={timeout}
   value={remainingTime}
   className={mode}
  />
 );
}
