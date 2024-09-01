import { useState } from 'react';
import Output from './Output';

export default function Greeting() {
  const [changeText, setChangeText] = useState(false);

  const handleClick = () => {
    setChangeText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      {changeText && <Output>It's good to see you!</Output>}
      {changeText && <p>Changed!</p>}
      <button onClick={handleClick}>Change Text</button>
    </div>
  );
}
