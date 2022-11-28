const app = document.querySelector('.app');
const inpTodo = app.querySelector('#inp-todo');
const btnAdd = app.querySelector('.btn-add');
const list = app.querySelector('.list');

// 0. 새로고침 하면 로컬스토리지에 있는 내 투두 리스트가 불러와져야 한다.
// console.log(localStorage);
if (localStorage.length !== 0) {
  for (let index = 0; index < localStorage.length; index++) {
    const liEl = document.createElement('li');
    const btnDelete = document.createElement('button');
    liEl.innerText = localStorage[index];
    liEl.classList.add('todo');
    btnDelete.innerText = '삭제하기';
    list.appendChild(liEl);
    liEl.appendChild(btnDelete);
  }
}

// 1. input창에 할 일을 입력할 수 있어야 한다.

// 2. 추가하기 버튼을 클릭하면, 하단에 빈 박스 아이콘과 할 일의 내용, 그리고 삭제하기 버튼이 있는 리스트 하나가 추가되어야 한다.
btnAdd.addEventListener('click', () => {
  // 2-1. 사용자가 할 일을 입력하지 않으면, '할 일을 입력해주세요.'라는 경고창을 띄운다.
  if (inpTodo.value === '') {
    alert('할 일을 입력해주세요.');
  } else {
    // 2-2. 하단에 빈 박스 아이콘과 할 일의 내용, 그리고 삭제하기 버튼이 있는 리스트 하나가 추가되어야 한다.
    const liEl = document.createElement('li');
    const btnDelete = document.createElement('button');

    // 2-3. 사용자가 입력한 할 일을 로컬 스토리지에 저장한다.
    if (localStorage.length === 0) {
      window.localStorage.setItem(0, inpTodo.value);
    } else {
      window.localStorage.setItem(localStorage.length, inpTodo.value);
    }

    // 2-4. 로컬 스토리지에 저장된 할 일을 불러와 화면에 띄운다.
    for (let key = 0; key < localStorage.length; key++) {
      // console.log(localStorage.getItem(key));
      liEl.innerText = localStorage[key];
      liEl.classList.add('todo');
      btnDelete.innerText = '삭제하기';
      list.appendChild(liEl);
      liEl.appendChild(btnDelete);
    }

    // 2-5. 할 일이 추가되면, input창에 빈 내용으로 바뀌어야 한다.
    inpTodo.value = '';
  }
});

// 3. 할 일을 완료하고 해당 리스트를 클릭하면, 할 일을 완료했다는 의미의 체크박스 아이콘과 취소선이 생겨야 한다.
const todoEl = document.querySelectorAll('.todo');
console.log(todoEl);
todoEl.forEach((element) => {
  element.addEventListener('click', () => {
    console.log(element);
    element.classList.toggle('done');
  });
});

// 4. 삭제하기 버튼을 클릭하면, 해당 리스트가 삭제되어야 한다.
// btnDelete.addEventListener('click', () => {
//   liEl.remove();
// });
