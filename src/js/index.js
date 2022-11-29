const app = document.querySelector('.app');
const inpTodo = app.querySelector('#inp-todo');
const btnAdd = app.querySelector('.btn-add');
const todoList = app.querySelector('.list');
const todoStorage = JSON.parse(localStorage.getItem('todoList')) || [];

if (todoStorage.length > 0) {
  todoStorage.forEach((task) => {
    readTodo(task);
  });
}

function readTodo(value) {
  const listEl = document.createElement('li');
  const btnCheck = document.createElement('button');
  const txtTodo = document.createElement('span');
  const btnDelete = document.createElement('button');

  btnCheck.classList.add('btn-todo');
  txtTodo.innerText = value;
  btnDelete.innerText = '삭제하기';

  listEl.append(btnCheck);
  listEl.append(txtTodo);
  listEl.append(btnDelete);
  todoList.append(listEl);
  todoStorage.push(listEl);

  doneTodo(btnCheck, txtTodo);
  deleteTodo(btnDelete, listEl);
}

btnAdd.addEventListener('click', () => {
  if (inpTodo.value === '') {
    alert('할 일을 입력해주세요.');
    return;
  }
  crateTodo();
});

function crateTodo() {
  const listEl = document.createElement('li');
  const btnCheck = document.createElement('button');
  const txtTodo = document.createElement('span');
  const btnDelete = document.createElement('button');

  btnCheck.classList.add('btn-todo');
  txtTodo.innerText = inpTodo.value;
  btnDelete.innerText = '삭제하기';

  todoStorage.push(inpTodo.value);
  saveTodo(todoStorage);

  listEl.append(btnCheck);
  listEl.append(txtTodo);
  listEl.append(btnDelete);
  todoList.append(listEl);

  inpTodo.value = '';

  doneTodo(btnCheck, txtTodo);
  deleteTodo(btnDelete, listEl);
}

function saveTodo(array) {
  return localStorage.setItem('todoList', JSON.stringify(array));
}

function doneTodo(btnEl, spanEl) {
  btnEl.addEventListener('click', () => {
    btnEl.classList.toggle('btn-done');
    spanEl.classList.toggle('txt-done');
  });
}

function deleteTodo(btnEl, liEl) {
  btnEl.addEventListener('click', () => {
    liEl.remove();
    // TODO: 로컬스토리지에도 삭제되는 기능 구현
  });
}
