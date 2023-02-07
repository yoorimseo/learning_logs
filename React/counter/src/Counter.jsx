import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  // 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주는 방법
  // const handleIncrease = () => {
  //   setNumber(number + 1);
  // };
  // const handleDecrease = () => {
  //   setNumber(number - 1);
  // };

  // 기존 값을 업데이트 하는 방법 > 값을 업데이트 하는 함수를 파라미터로 넣어주기
  // 함수형 업데이트는 나중에 컴포넌트를 최적화 할 때 주로 사용
  const handleIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const handleDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleDecrease}>-1</button>
    </div>
  );
}

export default Counter;
