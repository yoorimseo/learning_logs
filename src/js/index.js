const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const todoInput = todoForm.elements.todo;

  if (todoInput.value === '') {
    alert('할 일을 입력해주세요.');
  } else {
    addTodoItem(todoInput);
  }
});

function addTodoItem(input) {
  const todoItem = document.createElement('li');
  const todoItemText = document.createElement('span');
  const doneTodoBtn = document.createElement('button');
  const removeTodoBtn = document.createElement('button');

  todoItemText.innerText = input.value;
  doneTodoBtn.textContent = '완료';
  removeTodoBtn.textContent = '삭제';

  todoItem.append(todoItemText);
  todoItem.append(doneTodoBtn);
  todoItem.append(removeTodoBtn);

  todoList.append(todoItem);

  input.value = '';
}
