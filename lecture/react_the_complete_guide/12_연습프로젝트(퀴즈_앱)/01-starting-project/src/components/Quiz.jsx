import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

// 질문을 진행하고 사용자 답변을 등록
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id='quiz'>
      <Question
        // key 속성은 컴포넌트에서 변경될 때마다 컴포넌트가 ul 요소의 일부가 아니더라도 변경될 때면 언제든 리액트는 오래된 컴포넌트 인스턴스를 삭제하고 새로운 것을 만들어냄
        // 새로운 질문으로 바뀔 때마다 이 컴포넌트를 재생성해야 하기 때문에 key 속성을 사용
        // key 속성을 통해 리액트가 해당 컴포넌트를 삭제하고 재생성 할 수 있음
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
