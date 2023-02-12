import { type } from "os";
import React, { useState } from "react";
import "./index.scss";

type QuestionType = {
  title: string;
  variants: string[];
  correct: number;
};
type GameProps = {
  question: QuestionType;
  onClickVariant: (index: number) => void;
  step: number;
};
type ResultProps = {
  correct: number;
};
const questions: QuestionType[] = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

const Result: React.FC<ResultProps> = ({ correct }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из 10</h2>
      <button onClick={() => window.location.reload()}>
        Попробовать снова
      </button>
    </div>
  );
};

const Game: React.FC<GameProps> = ({ question, onClickVariant, step }) => {
  const variants = question.variants.map((v, index) => (
    <li onClick={() => onClickVariant(index)} key={index}>
      {v}
    </li>
  ));
  const percent = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>{variants}</ul>
    </>
  );
};

function App() {
  let [step, setStep] = useState(0);
  const question = questions[step];
  let [correct, setCorrect] = useState(0);
  const onClickVariant = (index: number) => {
    setStep(step + 1);
    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game question={question} onClickVariant={onClickVariant} step={step} />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
}

export default App;
