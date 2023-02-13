import React from 'react';
import users from './users';

function UserList() {
  return (
    <>
      {users.map((item) => (
        <div key={item.id}>
          <b>{item.username} | </b>
          <span>{item.email}</span>
        </div>
      ))}
    </>
  );
}

export default UserList;
