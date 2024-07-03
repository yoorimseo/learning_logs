const todoForm = document.querySelector('#todoForm');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let todoInput = todoForm.elements.todo;

  if (todoInput.value === '') {
    alert('할 일을 입력해주세요.');
  }
});
