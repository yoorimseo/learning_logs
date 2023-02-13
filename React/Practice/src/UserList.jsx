import React from 'react';

function UserList({ id, username, email }) {
  return (
    <>
      <div key={id}>
        <b>{username} </b>
        <span>({email})</span>
      </div>
    </>
  );
}

export default UserList;
