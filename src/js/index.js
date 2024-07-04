const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const todoInput = todoForm.elements.todo;

  if (todoInput.value === '') {
    alert('할 일을 입력해주세요.');
  } else {
    const todo = createTodo(todoInput);
    addTodoItem(...todo);
  }

  todoInput.value = '';
});

function createTodo(input) {
  const todoItem = document.createElement('li');
  const todoItemText = document.createElement('span');
  const doneTodoBtn = document.createElement('button');
  const removeTodoBtn = document.createElement('button');

  doneTodoBtn.textContent = '완료';
  todoItemText.innerText = input.value;
  removeTodoBtn.textContent = '삭제';

  return [todoItem, todoItemText, doneTodoBtn, removeTodoBtn];
}

function addTodoItem(...[todoItem, todoItemText, doneTodoBtn, removeTodoBtn]) {
  todoItem.append(doneTodoBtn);
  todoItem.append(todoItemText);
  todoItem.append(removeTodoBtn);

  todoList.append(todoItem);
}
