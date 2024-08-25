import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffledAnswers = useRef();

  // shuffledAnswers을 상단에 작성하게 되면 모든 질문에 답을 했을 때 오류가 나게 되므로, 퀴즈를 다 풀었을 경우 반환되는 if문 다음에 위치해야 아직 표시할 문제가 남아있을 때 실행하게 됨
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
          cssClasses = answerState;
        }

        return (
          <li
            key={answer}
            className='answer'
          >
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
