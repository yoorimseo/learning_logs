# DOM Events

## 1. Introducing Event

### 1) inline Events

```html
<button onclick="alert('you clicked me!'); alert('stop clicking')">Click Me!</button>
```

### 2) `onclick` 속성

```jsx
// 예시 1)
const btn = document.querySelector('#v2');

btn.onclick = function () {
  console.log('YOU CLICKED ME!');
};

// 예시 2)
function scream() {
  console.log('AAAAAHHHHH');
  console.log('STOP TOUCHING ME!');
}

btn.onmouseenter = scream;

// 예시 3) 바로 함수를 대입하면 작동하지 않음 -> 함수가 정의만 됐기 때문
// 함수를 대입하는 것이 아니라 함수를 참조해야 함 -> 화살표 함수 사용
document.querySelector('h1').onclick = () => {
  alert('you clicked the h1!');
};
```

## 2. addEventListener

```jsx
요소.addEventListener('이벤트', 콜백함수);

// 예시 1)
const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', function () {
  alert('CLICKED!');
});

// 예시 2)
function twist() {
  console.log('TWIST!');
}
function shout() {
  console.log('SHOUT!');
}

const tasButton = document.querySelector('#tas');

// tasButton.onclick = twist;
// tasButton.onclick = shout;
tasButton.addEventListener('click', twist);
tasButton.addEventListener('click', shout);
```

- `onclick` 보다 `addEventListener`가 필요한 이유
  - `onclick`
    - 같은 이벤트에 하나 이상의 다른 콜백함수를 사용할 수 없음
  - `addEventListener`
    - 하나 이상의 이벤트나 콜백함수를 실행 가능
    - 다양한 옵션 사용 가능
    - this 키워드를 사용하여 `addEventListener` 를 적용하려는 요소를 콜백함수에서 참조하여 사용 가능

## 3. Events Objects & Keyboard Events

```jsx
const input = document.querySelector('input');
input.addEventListener('keydown', function (e) {
  console.log(e.key); // 사용자가 누른 키 값, a
  console.log(e.code); // 사용자가 입력한 키보드의 물리적인 위치, KeyA
});
```

- 이벤트 객체는 모든 `addEventListener` 에서 접근 가능
  - 함수가 호출되면 자동으로 전달됨
  - 매개변수 추가 가능
  - 이벤트에 관한 속성 정보를 볼 수 있음

## 4. Forms Events & PreventDefault

```jsx
const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const list = document.querySelector('#cats');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const catName = input.value;
  const newLI = document.createElement('LI');

  newLI.innerText = catName;
  list.append(newLI);

  input.value = '';
});
```

- **`preventDefault()`** 메서드
  - 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자의 기본 동작을 실행하지 않도록 지정

## 5. Input & Change Events

```jsx
const input = document.querySelector('input');
const h1 = document.querySelector('h1');

// input.addEventListener('change', function (e) {
//     console.log("CASKDJASKJHD")
// })

input.addEventListener('input', function (e) {
  h1.innerText = input.value;
});
```

## 6. Event Bubbling(이벤트 버블링)

```jsx
const button = document.querySelector('#changeColor');
const container = document.querySelector('#container');

button.addEventListener('click', function (e) {
  container.style.backgroundColor = makeRandColor();
  e.stopPropagation();
});
container.addEventListener('click', function () {
  container.classList.toggle('hide');
});

const makeRandColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```

- 같은 이벤트 타입의 두 이벤트 핸들러가 한 요소에서 작동되었을 때 무슨 일이 일어나는지를 기술

### 1) DOM Event 흐름

> 📌 이벤트가 최상위 조상에서 시작해 아래로 전파되고(**캡처링 단계)**
>
> 이벤트가 타깃 요소에 도착해 실행된 후(**타깃 단계**)
>
> 다시 위로 전파(**버블링 단계**)
>
> 이런 과정을 통해 요소에 할당된 이벤트 핸들러가 호출

1. 이벤트가 발생하면 이벤트가 발생한 가장 안쪽 요소가 '타깃 요소(`event.target`)'가 됨
2. **캡처링**(capturing) 단계 : 이벤트가 하위 요소로 전파되는 단계
   1. 브라우저는 요소의 가장 바깥쪽의 조상이 캡처링 단계에 대해 그것에 등록된 `onclick` 이벤트 핸들러가 있는지를 확인하기 위해 검사하고, 만약 그렇다면 실행
   2. 그리고서 `<html>` 내부에 있는 다음 요소로 이동하고 같은 것을 하고, 그리고서 그 다음 요소로 이동하고, 실제로 선택된 요소에 닿을 때까지 계속
3. **타깃**(target) 단계 : 이벤트가 실제 타깃 요소에 전달되는 단계

   1. 별도로 처리되지 않음
   2. 캡처링과 버블링 단계의 핸들러는 타깃 단계에서 트리거 됨

      → 타깃 요소에 설정된 핸들러가 호출 됨

4. **버블링**(bubbling) 단계 : 이벤트가 상위 요소로 전파되는 단계
   1. 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생하는 모양이 마치 물속 거품(bubble)과 닮았기 때문
   2. 한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작
   3. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작

> 📌 `on<event>` 프로퍼티나 HTML 속성, `addEventListener(event, handler)`를 이용해 할당된 핸들러는 캡처링에 대해 전혀 알 수 없음
>
> - 이 핸들러들은 두 번째 혹은 세 번째 단계의 이벤트 흐름(타깃 단계와 버블링 단계)에서만 동작
> - 캡처링 단계에서 이벤트를 잡아내려면 `addEventListener`의 `capture` 옵션을 `true`로 설정

> 📌 각 핸들러는 아래와 같은 `event` 객체의 프로퍼티에 접근 가능
>
> - `event.target` – 이벤트가 발생한 가장 안쪽의 요소
> - `event.currentTarget` (=`this`) – 이벤트를 핸들링 하는 현재 요소 (핸들러가 실제 할당된 요소)
> - `event.eventPhase` – 현재 이벤트 흐름 단계(캡처링=1, 타깃=2, 버블링=3)

### **2) stopPropagation()**

- 이벤트를 완전히 처리하고 난 후 버블링을 중단하도록 명령
- 핸들러의 이벤트 객체가 호출되었을 때, 첫번째 핸들러가 실행되지만 이벤트가 더 이상 위로 전파되지 않도록 만들어 더 이상의 핸들러가 실행되지 않도록 함
- 버블링은 유용하기 때문에 꼭 필요한 상황이 아니라면 막지 않는 것이 좋음

## 7. Event Delegation(이벤트 위임)

```jsx
const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');
tweetForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = '';
  tweetInput.value = '';
});

const addTweet = (username, tweet) => {
  const newTweet = document.createElement('li');
  const bTag = document.createElement('b');
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(`- ${tweet}`);
  tweetsContainer.append(newTweet);
};

tweetsContainer.addEventListener('click', function (e) {
  e.target.nodeName === 'LI' && e.target.remove();
});
```

- 이벤트 위임은 비슷한 방식으로 여러 요소를 다뤄야 할 때 사용
- 이벤트 위임을 사용하면 요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당해도 여러 요소를 한꺼번에 다룰 수 있음
- 공통 조상에 할당한 핸들러에서 `event.target`을 이용하면 실제 어디서 이벤트가 발생했는지 알 수 있음 → 이를 활용해 이벤트를 핸들링
