import React, { useState, useRef } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [userList, setUserList] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ]);
  const nextId = useRef(userList.length + 1);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    setUserList([...userList, user]);
    // setUserList(userList.concat(user));

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };

  return (
    <div className='App'>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      {userList.map((item) => (
        <UserList
          key={item.id}
          username={item.username}
          email={item.email}
        />
      ))}
    </div>
  );
}

export default App;
