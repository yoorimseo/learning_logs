const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const todoInput = todoForm.elements.todo;

  if (todoInput.value === '') {
    alert('할 일을 입력해주세요.');
  } else {
    const todo = createTodo(todoInput.value);

    addTodoItem(...todo);
    saveTodoItem();
  }

  todoInput.value = '';
});

function createTodo(text) {
  const todoItem = document.createElement('li');
  const todoItemText = document.createElement('span');
  const doneTodoBtn = document.createElement('button');
  const removeTodoBtn = document.createElement('button');

  doneTodoBtn.textContent = '완료';
  todoItemText.innerText = text;
  removeTodoBtn.textContent = '삭제';

  return [todoItem, todoItemText, doneTodoBtn, removeTodoBtn];
}

function addTodoItem(...[todoItem, todoItemText, doneTodoBtn, removeTodoBtn]) {
  todoItem.append(doneTodoBtn);
  todoItem.append(todoItemText);
  todoItem.append(removeTodoBtn);

  todoList.append(todoItem);

  doneTodoBtn.addEventListener('click', function () {
    todoItemText.classList.toggle('done');
  });

  removeTodoBtn.addEventListener('click', function () {
    todoItem.remove();
  });
}

function saveTodoItem() {
  const todoItems = [];

  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector('span').textContent,
      done: todoList.children[i].classList.contains('done'),
    };

    todoItems.push(todoObj);
  }

  localStorage.setItem('data', JSON.stringify(todoItems));
}
