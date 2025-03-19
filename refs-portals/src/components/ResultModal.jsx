/*
forwardRef: "Older" approach to forwarding refs to other components
(React Version < 19)
*/

// import { forwardRef } from "react";

// const ResultModal = forwardRef(function ResultModal(
//  { result, targetTime },
//  ref
// ) {
//  return (
//   <dialog ref={ref} className="result-modal">
//    <h2>You {result}.</h2>
//    <p>
//     Target Time: <strong>{targetTime} seconds.</strong>
//    </p>
//    <p>
//     Time remaining: <strong>X seconds.</strong>
//    </p>
//    <form method="dialog">
//     <button>Close</button>
//    </form>
//   </dialog>
//  );
// });

// export default ResultModal;

import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
 ref,
 targetTime,
 remainingTime,
 onReset,
}) {
 const dialogRef = useRef();

 const defeat = remainingTime <= 0;
 const timeRemainingFormatted = (remainingTime / 1000).toFixed(2);
 const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

 /*
	useImperativeHandle: Exposes custom methods to parent components.
	Usage of 'useRef' is required to create a reference to the dialog element
	inside this component.
 */
 useImperativeHandle(ref, () => {
  return {
   open() {
    dialogRef.current.showModal();
   },
  };
 });

 // Portal allows you to render this JSX code in another part of the DOM.
 return createPortal(
  <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
   {defeat && <h2>You lost...</h2>}
   {!defeat && <h2>You won! Score: {score}</h2>}
   <p>
    Target Time: <strong>{targetTime} seconds.</strong>
   </p>
   <p>
    Time remaining: <strong>{timeRemainingFormatted} seconds.</strong>
   </p>
   <form method="dialog" onSubmit={onReset}>
    <button>Close</button>
   </form>
  </dialog>,
  document.getElementById("modal") // Second argument supplied to ReactDOM.createPortal; the target HTML element to render the code.
 );
}
