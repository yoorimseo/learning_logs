const app = document.querySelector('.app');
const inpTodo = app.querySelector('#inp-todo');
const btnAdd = app.querySelector('.btn-add');
const list = app.querySelector('.list');
const liEl = document.createElement('li');
const btnDelete = document.createElement('button');

// 1. input창에 할 일을 입력할 수 있어야 한다.

// 2. 추가하기 버튼을 클릭하면, 하단에 빈 박스 아이콘과 할 일의 내용, 그리고 삭제하기 버튼이 있는 리스트 하나가 추가되어야 한다.
btnAdd.addEventListener('click', () => {
  // 2-1. 사용자가 할 일을 입력하지 않으면, '할 일을 입력해주세요.'라는 경고창을 띄운다.
  if (inpTodo.value === '') {
    alert('할 일을 입력해주세요.');
  }

  // 2-2. 하단에 빈 박스 아이콘과 할 일의 내용, 그리고 삭제하기 버튼이 있는 리스트 하나가 추가되어야 한다.
  liEl.innerText = inpTodo.value;
  liEl.classList.add('todo');
  btnDelete.innerText = '삭제하기';
  list.appendChild(liEl);
  liEl.appendChild(btnDelete);

  // 2-3. 할 일이 추가되면, input창에 빈 내용으로 바뀌어야 한다.
  inpTodo.value = '';
});

// 3. 할 일을 완료하고 해당 리스트를 클릭하면, 할 일을 완료했다는 의미의 체크박스 아이콘과 취소선이 생겨야 한다.
liEl.addEventListener('click', () => {
  liEl.classList.toggle('done');
});

// 4. 삭제하기 버튼을 클릭하면, 해당 리스트가 삭제되어야 한다.
btnDelete.addEventListener('click', () => {
  liEl.remove();
});
