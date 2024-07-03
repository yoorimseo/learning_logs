const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let todoInput = todoForm.elements.todo;

  if (todoInput.value === '') {
    alert('할 일을 입력해주세요.');
  }

  addTodoItem(todoInput);
});

function addTodoItem(input) {
  const todoItem = document.createElement('li');
  todoItem.innerText = input.value;

  todoList.append(todoItem);
  input.value = '';
}
