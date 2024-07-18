# JavaScript Async

## 1. Call Stack(호출 스택)

- 여러 함수들을 호출하는 스크립트에서 해당 위치를 추적하는 인터프리터를 위한 메커니즘
- 현재 어떤 함수가 실행 중인지, 그 함수 내에서 어떤 함수가 호출되어야 하는지 등을 제어

### 1) 호출 과정

1. 스크립트가 함수를 호출하면, 인터프리터는 이를 호출 스택에 추가한 다음 함수를 실행하기 시작
2. 해당 함수에 의해 호출되는 모든 함수는 호출 스택에 추가되고, 호출이 도달하는 위치에서 실행
3. 현재 함수가 끝나면, 인터프리터는 스택을 제거하고 호출 스택 마지막 코드 목록에서 중단된 실행을 다시 시작
4. 스택이 할당된 공간보다 많은 공간을 차지하면, “stack overflow” 에러가 발생

> 📌 **요약**
>
> 1. 빈 호출 스택으로 시작
> 2. 함수를 호출할 때마다 자동으로 호출 스택에 추가됨
> 3. 해당 코드가 모두 실행된 후, 호출 스택에서 자동으로 제거됨
> 4. 빈 호출 스택으로 끝남

</aside>

### 2) 예제

```jsx
const multiply = (x, y) => x * y;

const square = (x) => multiply(x, x);

const isRightTriangle = (a, b, c) => square(a) + square(b) === square(c);

console.log('BEFORE');
isRightTriangle(3, 4, 5);
console.log('DONEEEE!');
```

1. isRightTriangle의 square(3) 함수 호출
   1. square(3) 호출, 스택에 추가
   2. multiply(3, 3) 호출, 스택에 추가
   3. multiply(3, 3) = 9, 스택에서 제거
   4. square(3) = 9, 스택에서 제거
   5. isRightTriangle의 square(3) = 9
2. isRightTriangle의 square(4), square(5)도 함수 호출을 스택에 추가해 값이 반환될 때마다 제거하는 과정 진행

### 3) 콜스택을 시각화해서 보여주는 사이트

[latentflip.com](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4=)

## 2. Web API & Single Thread

### 1) Web API

- JavaScript에서 호출할 수 있는 일반적인 메서드
- JavaScript가 해결하지 못하는 것은 기본적으로 브라우저로 넘어감
- JavaScript의 호출 스택이 setTimeout과 같은 Web API 기능을 인식해 브라우저로 넘김
  - 브라우저가 작업을 마치면 해당 시간 후에 콜스택에 다시 추가 됨
  - 그리고 나서 JavaScript가 다시 코드를 실행

### 2) 콜백

- 함수가 바로 실행되는 것이 아니라, 나중에 실행됨

## 3. Callback Hell

- 만약 setTimeout 함수가 하나라면 괜찮지만, 5~6개 이상이 중첩되어 있다면 코드가 복잡해짐
  - 각각의 함수들이 여러 번 콜백을 받을 수 있기 때문
  - 콜백 지옥!

## 4. Promises

```jsx
// 예시 1
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    setTimeout(() => {
      if (rand < 0.7) {
        resolve('YOUR FAKE DATA HERE');
      }
      reject('Request Error!');
    }, 1000);
  });
};

fakeRequest('/dogs/1')
  .then((data) => {
    console.log('DONE WITH REQUEST!');
    console.log('data is:', data);
  })
  .catch((err) => {
    console.log('OH NO!', err);
  });

// 예시 2
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

delayedColorChange('red', 1000)
  .then(() => delayedColorChange('orange', 1000))
  .then(() => delayedColorChange('yellow', 1000))
  .then(() => delayedColorChange('green', 1000))
  .then(() => delayedColorChange('blue', 1000))
  .then(() => delayedColorChange('indigo', 1000))
  .then(() => delayedColorChange('violet', 1000));
```

### 1) 개념

- 객체의 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과값을 나타냄
- 프로미스가 생성된 시점에는 알려지지 않았을 수도 있는 값을 위한 대리자
- 비동기 연산이 종료된 이후에 결과값과 실패 사유를 처리하기 위한 처리기를 연결 가능
- 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환 가능
  - 최종 결과를 반환하는 것이 아니고, 미래의 어떤 시점에 결과를 제공하겠다는 프로미스(promise)를 반환

### 2) 상태

1. 대기(`pending`) : 이행하지도, 거부하지도 않은 초기 상태
2. 이행(`fulfilled`) : 연산이 성공적으로 완료됨
3. 거부(`rejected`) : 연산이 실패함

- 대기 중인 프로미스는 값과 함께 이행할 수도, 어떤 이유(오류)로 인해 거부될 수도 있음
  - 이행이나 거부될 때, 프로미스의 `then` 메서드에 의해 대기열(큐)에 추가된 처리기들이 호출됨
  - 이미 이행했거나 거부된 프로미스에 처리기를 연결해도 호출되므로, 비동기 연산과 처리기 연결 사이에 경합 조건은 없음
- 프로미스가 이행되거나 거부되었지만 보류 중이 아닌 경우, 프로미스가 확정된 것으로 간주
- `resolved` : 프로미스가 다른 프로미스의 최종 상태와 일치하도록 settled 되거나 locked-in 되어 더 이상 해결하거나 거부해도 아무런 효과가 없음을 의미
  - 종종 `fulfilled` 프로미스와 동일하지만, 해결된 프로미스도 보류 중이거나 거부될 수 있음

## 5. Async Function(비동기 함수)

```jsx
async function name([param[, param[, ... param]]]) {
 statements
}

// 예시
const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'corgifeetarecute') return 'WELCOME!'
    throw 'Invalid Password'
}

login('todd', 'corgifeetarecute')
    .then(msg => {
        console.log("LOGGED IN!")
        console.log(msg)
    })
    .catch(err => {
        console.log("ERROR!")
        console.log(err)
    })
```

- AsyncFunction 객체를 반환하는 하나의 비동기 함수를 정의
- 비동기 함수
  - 이벤트 루프를 통해 비동기적으로 작동하는 함수
  - 암시적으로 Promise를 사용하여 결과를 반환
  - 비동기 함수를 사용하는 코드의 구문과 구조는 표준 동기 함수를 사용하는 것과 많이 비슷
  - async function expression을 사용해서 선언 가능
- async 함수에는 `await` 식이 포함될 수 있음

### 1) `await`

```jsx
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

async function rainbow() {
  await delayedColorChange('red', 1000);
  await delayedColorChange('orange', 1000);
  await delayedColorChange('yellow', 1000);
  await delayedColorChange('green', 1000);
  await delayedColorChange('blue', 1000);
  await delayedColorChange('indigo', 1000);
  await delayedColorChange('violet', 1000);
  return 'ALL DONE!';
}

async function printRainbow() {
  await rainbow();
  console.log('END OF RAINBOW!');
}

printRainbow();
```

- async 함수의 실행을 일시 중지하고 전달된 Promise의 해결을 기다린 다음 async 함수의 실행을 다시 시작하고 완료한 후 값을 반환
  - `await` 키워드는 `async` 함수에서만 유효
  - `async` 함수의 본문 외부에서 사용하면 SyntaxError가 발생
- `async` 함수는 항상 promise를 반환
  - 만약 `async` 함수의 반환값이 명시적으로 promise가 아니라면 암묵적으로 promise로 감싸짐
- `async` 함수의 본문은 0개 이상의 `await` 문으로 분할된 것으로 생각할 수 있음

  - 첫번째 `await` 문을 포함하는 최상위 코드는 동기적으로 실행

        → `await` 문이 없는 `async` 함수는 동기적으로 실행

        → `await` 문이 있다면 `async` 함수는 항상 비동기적으로 완료

### 2) Handling Errors In Async Functions

```jsx
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 2000) {
        reject('Connection Timeout :(');
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay);
  });
};

async function makeTwoRequests() {
  try {
    let data1 = await fakeRequest('/page1');
    console.log(data1);
    let data2 = await fakeRequest('/page2');
    console.log(data2);
  } catch (e) {
    console.log('CAUGHT AN ERROR!');
    console.log('error is:', e);
  }
}
```
