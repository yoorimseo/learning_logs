import React, { useState } from 'react';

function InputSample() {
  // const [text, setText] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  });
  const { name, nickname } = inputs;

  const handleChangeText = (e) => {
    // setText(e.target.value);
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleReset = () => {
    // setText('');
    setInputs({
      ...inputs,
      name: '',
      nickname: '',
    });
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
