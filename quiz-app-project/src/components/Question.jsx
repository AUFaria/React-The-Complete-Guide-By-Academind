import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS from "../questions.js";

const BASE_TIMER = 10000;
const ANSWER_SELECTED_TIMER = 1000;
const ANSWER_RESULT_TIMER = 2000;

export default function Question({
 questionIndex,
 onSelectAnswer,
 onSkipAnswer,
}) {
 const [answer, setAnswer] = useState({
  selectedAnswer: "",
  isCorrect: null,
 });

 let timer = BASE_TIMER;

 if (answer.selectedAnswer) {
  timer = ANSWER_SELECTED_TIMER;
 }

 if (answer.isCorrect !== null) {
  timer = ANSWER_RESULT_TIMER;
 }

 function handleSelectAnswer(answer) {
  setAnswer({
   selectedAnswer: answer,
   isCorrect: null,
  });

  setTimeout(() => {
   setAnswer({
    selectedAnswer: answer,
    isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
   });

   setTimeout(() => {
    onSelectAnswer(answer);
   }, ANSWER_RESULT_TIMER);
  }, ANSWER_SELECTED_TIMER);
 }

 let answerState = "";

 if (answer.selectedAnswer && answer.isCorrect !== null) {
  answerState = answer.isCorrect ? "correct" : "wrong";
 } else if (answer.selectedAnswer) {
  answerState = "answered";
 }

 return (
  <div id="question">
   <QuestionTimer
    key={timer}
    timeout={timer}
    onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
    mode={answerState}
   />
   <h2>{QUESTIONS[questionIndex].text}</h2>
   <Answers
    answers={QUESTIONS[questionIndex].answers}
    selectedAnswer={answer.selectedAnswer}
    answerState={answerState}
    onSelect={handleSelectAnswer}
   />
  </div>
 );
}
