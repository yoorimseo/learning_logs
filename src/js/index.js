// 캘린더
const calendarTable = document.querySelector('#calendarTable');
const calendarTableTbody = calendarTable.children[1];

const date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth() + 1;
const today = date.getDay() + 7;

const firstDay = new Date(thisYear, thisMonth - 1, 1).getDay();
const daysInThisMonth = new Date(thisYear, thisMonth, 0).getDate();
const lastMonthDate = new Date(thisYear, thisMonth, 0);
const lastMonthDay = lastMonthDate.getDate();
let lastDayInlastMonth = new Date(thisYear, thisMonth - 1, 0).getDay();
const nextMonthDate = new Date(thisYear, thisMonth + 1, 1);
let nextMonthDay = nextMonthDate.getDate();
let now = 1;

for (let week = 0; week < 6; week++) {
  const weekRow = document.createElement('tr');

  for (let day = 0; day < 7; day++) {
    const dayCell = document.createElement('td');

    if (day === 0) {
      dayCell.classList.add('sunday');
    } else if (day === 6) {
      dayCell.classList.add('saturday');
    }

    if (week === 0 && day < firstDay) {
      dayCell.innerText = lastMonthDay - lastDayInlastMonth;
      lastDayInlastMonth--;
      dayCell.classList.add('opacity');
    } else if (now > daysInThisMonth) {
      dayCell.innerText = nextMonthDay;
      nextMonthDay++;
      dayCell.classList.add('opacity');
    } else {
      dayCell.innerText = now;
      now++;
    }

    weekRow.appendChild(dayCell);
  }

  calendarTableTbody.appendChild(weekRow);

  if (now > daysInThisMonth) break;
}

// 투두리스트
const todoForm = document.querySelector('#todoForm');
const list = document.querySelector('#list');
const icons = {
  circle: './src/img/icons/circle-icon.png',
  check: './src/img/icons/check-circle-icon.png',
  trash: './src/img/icons/trash-icon.png',
};
const storageItems = JSON.parse(localStorage.getItem('data'));

if (storageItems) {
  for (let i = 0; i < storageItems.length; i++) {
    const text = storageItems[i].contents;
    const state = storageItems[i].done;
    const savedItemEl = createTodo(text);

    if (state) {
      savedItemEl[1].classList.add('done');
      savedItemEl[2].querySelector('img').src = icons.check;
    }

    addTodoItem(...savedItemEl);
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

  return [todoItem, todoItemText, doneTodoBtn, removeTodoBtn];
}

function addTodoItem(...[todoItem, todoItemText, doneTodoBtn, removeTodoBtn]) {
  todoItem.append(doneTodoBtn);
  todoItem.append(todoItemText);
  todoItem.append(removeTodoBtn);

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
