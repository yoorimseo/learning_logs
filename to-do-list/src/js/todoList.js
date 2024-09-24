// 투두리스트
const todoForm = document.querySelector('#todoForm');
const list = document.querySelector('#list');
const icons = {
  circle: './src/img/icons/circle-icon.png',
  check: './src/img/icons/check-circle-icon.png',
  trash: './src/img/icons/trash-icon.png',
};

function getStorageItems() {
  const storageItems = JSON.parse(localStorage.getItem('data'));

  if (storageItems) {
    for (let i = 0; i < storageItems.length; i++) {
      const text = storageItems[i].contents;
      const state = storageItems[i].done;
      const savedItemEl = createTodo(text);

      if (state) {
        savedItemEl.todoItemText.classList.add('done');
        savedItemEl.doneTodoBtn.querySelector('img').src = icons.check;
      }

      addTodoItem(savedItemEl);
    }
  }
}

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
  const checkTodoImg = document.createElement('img');
  const removeTodoBtn = document.createElement('button');
  const removeTodoImg = document.createElement('img');

  checkTodoImg.src = icons.circle;
  todoItemText.innerText = text;
  removeTodoImg.src = icons.trash;

  doneTodoBtn.append(checkTodoImg);
  removeTodoBtn.append(removeTodoImg);

  todoItem.append(doneTodoBtn);
  todoItem.append(todoItemText);
  todoItem.append(removeTodoBtn);

  return { todoItem, todoItemText, doneTodoBtn, removeTodoBtn };
}

function addTodoItem({ todoItem, todoItemText, doneTodoBtn, removeTodoBtn }) {
  list.append(todoItem);

  doneTodoBtn.addEventListener('click', function () {
    todoItemText.classList.toggle('done');
    const checkTodoImg = doneTodoBtn.querySelector('img');

    if (todoItemText.classList.contains('done')) {
      checkTodoImg.src = icons.check;
    } else {
      checkTodoImg.src = icons.circle;
    }

    saveTodoItem();
  });

  removeTodoBtn.addEventListener('click', function () {
    todoItem.remove();
    saveTodoItem();
  });
}

function saveTodoItem() {
  const todoItems = [];

  for (let i = 0; i < list.children.length; i++) {
    const todoObj = {
      contents: list.children[i].querySelector('span').textContent,
      done: list.children[i].querySelector('span').classList.contains('done'),
    };

    todoItems.push(todoObj);
  }

  localStorage.setItem('data', JSON.stringify(todoItems));
}

export { getStorageItems };
