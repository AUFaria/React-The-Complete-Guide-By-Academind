import quizCompleteImg from "../assets/quiz-complete.png";

import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
 const skippedAnswers = userAnswers.filter((answer) => answer === null);
 const correctAnswers = userAnswers.filter(
  (answer, index) => answer === QUESTIONS[index].answers[0]
 );

 const skippedPercent = Math.round(
  (skippedAnswers.length / userAnswers.length) * 100
 );
 const correctPercent = Math.round(
  (correctAnswers.length / userAnswers.length) * 100
 );
 const wrongPercent = 100 - skippedPercent - correctPercent;

 return (
  <div id="summary">
   <img src={quizCompleteImg} alt="Trophy icon" />
   <h2>Quiz Completed!</h2>
   <div id="summary-stats">
    <p>
     <span className="number">{skippedPercent}%</span>
     <span className="text">skipped</span>
    </p>
    <p>
     <span className="number">{correctPercent}%</span>
     <span className="text">correct answers</span>
    </p>
    <p>
     <span className="number">{wrongPercent}%</span>
     <span className="text">incorrect answers</span>
    </p>
   </div>
   <ol>
    {userAnswers.map((answer, index) => {
     let answerCSSClass = "user-answer";

     if (answer === null) {
      answerCSSClass += " skipped";
     } else if (answer === QUESTIONS[index].answers[0]) {
      answerCSSClass += " correct";
     } else {
      answerCSSClass += " wrong";
     }

     return (
      <li key={index} >
       <h3>{index + 1}</h3>
       <p className="question">{QUESTIONS[index].text}</p>
       <p className={answerCSSClass}>{answer ?? "Skipped"}</p>
      </li>
     );
    })}
   </ol>
  </div>
 );
}
