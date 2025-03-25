import { useCallback, useState } from "react";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

import QUESTIONS from "../questions.js";

export default function Quiz() {
 const [userAnswers, setUserAnswers] = useState([]);

 const activeQuestionIndex = userAnswers.length;

 const quizIsOver = activeQuestionIndex === QUESTIONS.length;

 const handleSelectAnswer = useCallback(function handleSelectAnswer(
  selectedAnswer
 ) {
  setUserAnswers((previousUserAnswers) => {
   return [...previousUserAnswers, selectedAnswer];
  });
 },
 []);

 const handleSkipAnswer = useCallback(
  () => handleSelectAnswer(null),
  [handleSelectAnswer]
 );

 if (quizIsOver) {
  return <Summary userAnswers={userAnswers} />;
 }

 return (
  <div id="quiz">
   <Question
    key={activeQuestionIndex}
    questionIndex={activeQuestionIndex}
    onSelectAnswer={handleSelectAnswer}
    onSkipAnswer={handleSkipAnswer}
   />
  </div>
 );
}
