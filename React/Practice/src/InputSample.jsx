import React, { useState, useRef } from 'react';

function InputSample() {
  // const [text, setText] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  const nameInput = useRef();
  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const handleChangeText = (e) => {
    // setText(e.target.value);
    const { name, value } = e.target; // 우선 e.target에서 name과 value를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };
  const handleReset = () => {
    // setText('');
    setInputs({
      ...inputs,
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };

  return (
    <div>
      {/* <label htmlFor='text'>
        값을 입력해주세요.
        <br />
      </label>
      <input
        type='text'
        id='text'
        value={text}
        onChange={handleReset}
      /> */}
      <input
        type='text'
        name='name'
        value={name}
        placeholder='이름'
        onChange={handleChangeText}
        ref={nameInput}
      />
      <input
        type='text'
        name='nickname'
        value={nickname}
        placeholder='닉네임'
        onChange={handleChangeText}
      />
      <button
        type='button'
        onClick={handleReset}
      >
        초기화
      </button>
      <h3>
        값: {name}({nickname})
      </h3>
    </div>
  );
}

export default InputSample;
