# AJAX와 API

## 1. AJAX(Asynchronous JavaScript and XML)

- XMLHttpRequest 기술을 사용해 복잡하고 동적인 웹 페이지를 구성하는 프로그래밍 방식
- 전체 페이지가 다시 로드되지 않고, HTML 페이지 일부 DOM만 업데이트

  → 좀 더 복잡한 웹 페이지를 만들 수 있게 해줌

- 웹 페이지 일부가 리로드 되는 동안에도 코드가 계속 실행되어 비동기식으로 작업 가능

## 2. API(Application Programming Interface)

- 소프트웨어 프로그램(애플리케이션) 내부에 존재하는 기능 및 규칙의 집합
- 소프트웨어를 통해 상호작용 할 수 있음
- API를 제공하는 애플리케이션과 서드파티 소프트웨어 및 하드웨어 등의 것들 사이의 간단한 계약(인터페이스)이라고 볼 수 있음

### 1) 웹 개발에서의 API

- 개발자가 앱을 통해 사용자의 웹 브라우저에서 상호작용 할 수 있도록 하는 코드 기능들
- 사용자의 컴퓨터 상에 있는 다른 소프트웨어 및 하드웨어, 또는 서드파티 웹 사이트나 서비스이 집합

## 3. JSON(JavaScript Object Notation)

```jsx
const data = `{"ticker": {
        "base":"BTC",
        "target":"USD",
        "price":"11288.49813464",
        "volume":"91769.69699773",
        "change":"-46.29462447"
        },
       "timestamp":1596510482,
       "success":true,
       "error":""
      }`;

const data1 = JSON.parse(data); // JSON -> JavaScript
const data2 = JSON.stringify(data); // JavaScript -> JSON
```

- JSON을 분석하거나 값을 JSON으로 변환하는 메서드를 가지고 있음
- JSON을 직접 호출하거나 인스턴스를 생성할 수 없음

### 1) JavaScript와 JSON의 차이

- JSON은 객체, 배열, 숫자, 문자열, 불리언과 null을 직렬화하기 위한 구문
  - JavaScript에 기반을 두고 있지만 분명한 차이점 존재
  - 어떤 JavaScript는 JSON이 아님

### 2) Methods

- `JSON.parse()` : 문자열을 JSON으로서 구문 분석하고, 선택적으로 분석 결과의 값과 속성을 변환해 반환
- `JSON.stringify()` : 주어진 값에 해당하는 JSON 문자열을 반환
  - 선택 사항으로 특정 속성만 포함하거나 사용자 정의 방식으로 속성을 대체

## 4. Using Hoppscotch or Postman

- HTTP 요청을 만들 때 사용하는 도구
- 요청을 저장하기 위해 다양한 API를 테스트 가능
- 개발자들이 API 요청을 테스트하도록 돕기 위해 존재

[Hoppscotch • Open source API development ecosystem](https://hoppscotch.io/)

[](https://web.postman.co/home)

## 5. HTTP

### 1) HTTP Verbs

| GET  | - 정보를 얻거나 검색할 때 사용          |
| ---- | --------------------------------------- |
| POST | - 데이터를 어디론가 보내려고 할 때 사용 |

- 우리가 전송하려는 데이터가 데이터베이스에 저장되거나 서버 어딘가에 영향을 준다는 것을 의미 |

### 2) HTTP Status Codes

- 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌

[HTTP 상태 코드 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### 3) Query Strings

- URL에 추가적인 정보를 넣기 위한 문자열
- 키-값쌍으로 이루어짐

### 4) HTTP Headers

- 주어진 요청과 함께 정보를 전달하는 부가적인 방법
- 키-값 쌍으로 이루어짐
- 메타데이터와 같은 것으로 요청에 세부 사항 추가 가능

## 6. XHR(**XMLHttpRequest)**

```jsx
const req = new XMLHttpRequest();

// 오류가 없을 때 실행되는 것
req.onload = function () {
  console.log('IT LOADED!!');
  const data = JSON.parse(this.responseText);
  console.log(data.name, data.height);
};

// 오류가 날 때 실행되는 것
req.onerror = function () {
  console.log('ERROR!!!!');
  console.log(this);
};

req.open('GET', 'https://swapi.dev/api/people/1/');
req.send();
```

- 서버와 상호작용할 때 사용
- 페이지의 새로고침 없이도 URL에서 데이터를 가져올 수 있음
- 사용자의 작업을 방해하지 않고 페이지의 일부를 업데이트 가능

## 7. Using The Fetch API

- HTTP 파이프라인을 구성하는 요청과 응답 등의 요소를 JavaScript에서 접근하고 조작할 수 있는 인터페이스를 제공
- Fetch API가 제공하는 전역 `fetch()` 메서드로 네트워크의 리소스를 쉽게 비동기적으로 취득 가능
- 서비스 워커에서도 쉽게 사용할 수 있는 프로미스 기반의 개선된 대체제
- CORS를 포함한 고급 개념을 HTTP 확장으로 정의

## 1) 정의

```jsx
const loadStarWarsPeople = async () => {
  try {
    const res = await fetch('https://swapi.dev/api/people/1/');
    const data = await res.json();
    console.log(data);

    const res2 = await fetch('https://swapi.dev/api/people/2/');
    const data2 = await res2.json();
    console.log(data2);
  } catch (e) {
    console.log('ERROR!!!', e);
  }
};

loadStarWarsPeople();
```

- 가장 단순한 형태의 `fetch()`는 가져오고자 하는 리소스의 경로를 나타내는 하나의 인수만 받음
- 응답은 `Reponse` 객체로 표현되며, JSON 응답 본문을 바로 반환하지는 않음
- `Reponse` 객체 역시 JSON 응답 본문을 그대로 포함하지 않음
- `Reponse` 는 HTTP 전체를 나타내는 객체로, JSON 본문 콘텐츠를 추출하기 위해서는 `json()` 메서드를 호출해야 함
  - `json()` : 응답 본문 텍스트를 JSON으로 파싱한 결과로 이행하는 또 다른 프로미스를 반환

## 8. Axios

```jsx
const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(res.data);
  } catch (e) {
    console.log('ERROR', e);
  }
};

getStarWarsPerson(5);
getStarWarsPerson(10);
```

[GitHub - axios/axios: Promise based HTTP client for the browser and node.js](https://github.com/axios/axios#installing)

- node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트

### 1) Setting Headers With Axios

```jsx
const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLI = document.createElement('LI');

  newLI.append(jokeText);
  jokes.append(newLI);
};

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: 'application/json' } };
    const res = await axios.get('https://icanhazdadjoke.com/', config);

    return res.data.joke;
  } catch (e) {
    return 'NO JOKES AVAILABLE! SORRY :(';
  }
};

button.addEventListener('click', addNewJoke);
```
