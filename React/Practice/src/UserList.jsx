import React from 'react';

function UserList({ id, username, email, onRemove }) {
  return (
    <>
      <div key={id}>
        <b>{username} </b>
        <span>({email})</span>
        <button onClick={() => onRemove(id)}>삭제</button>
      </div>
    </>
  );
}

export default UserList;
