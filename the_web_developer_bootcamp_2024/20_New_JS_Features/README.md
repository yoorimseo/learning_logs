# Newer JavaScript Features

## 1. default params(매개변수 기본값)

- 매개변수가 주어지지 않았을 때 사용
  - 매개변수가 주어지면 해당 값으로, 주어지지 않으면 기본 값을 사용
  - 매개변수 순서 중요
    - 매개변수의 기본 값은 2번째부터 사용해야 함
  ```jsx
  function rollDie(numSides = 6) {
    return Math.floor(Math.random() * numSides) + 1;
  }

  function greet(person, msg = 'Hey there', punc = '!') {
    console.log(`${msg}, ${person}${punc}`);
  }
  ```

## 2. spread 구문(전개 구문)

- **전개 구문**을 사용하면 배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 (함수로 호출할 경우) 또는 요소 (배열 리터럴의 경우)로 확장하여, 0개 이상의 키-값의 쌍으로 객체로 **확장**시킬 수 있음

### 1) 함수에서 전개 구문

```jsx
const nums = [13, 4, 5, 21, 3, 3, 1, 2, 7, 6, 4, 2, 53456];

Math.max(nums); //NaN
Math.max(...nums); //53456
```

- 전개 구문을 통해 개별 인수를 전달

### 2) 배열에서 전개 구문

```jsx
const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...cats, ...dogs];
// allPets = ['Blue', 'Scout', 'Rocket', 'Rusty', 'Wyatt'];
```

- 전개 구문을 통해 개별 요소를 전달
- 원본 배열을 전개 구문을 통해 똑같이 복사하면, 얕은 복사이기 때문에 원본 배열과 함께 수정됨
- 문자열을 배열로 만들 때도 사용 가능
  ```jsx
  const arr = [...'hello']; // ['h', 'e', 'l', 'l', 'o']
  ```

### 3) 객체에서 전개 구문

```jsx
const feline = { legs: 4, family: 'Felidae' };
const canine = { isFurry: true, family: 'Caninae' };

const catDog = { ...feline, ...canine };
// catDog = { legs: 4, family: 'Caninae', isFurry: true }

const dataFromForm = {
  email: 'blueman@gmail.com',
  password: 'tobias123!',
  username: 'tfunke',
};
const newUser = { ...dataFromForm, id: 2345, isAdmin: false };
// newUser = {
//    email: 'blueman@gmail.com',
//    password: 'tobias123!',
//    username: 'tfunke'
//    id: 2345,
//    isAdmin: false
// }
```

- 하나의 객체에서 새로운 객체로 속성을 복사
- 속성 중 키 이름이 중복될 경우, 나중에 쓴 것으로 덮어 씌워짐
- 배열이나 문자열을 전개 구문을 사용하여 객체로 정의할 때, 키 값은 0부터 length-1까지, value는 해당 배열 혹은 문자열 각 요소로 됨
  ```jsx
  {...[2, 4, 6, 8]};  // { 0: 2, 1: 4, 2: 6, 3: 8 }
  {...'hiiii'};  // { 0: 'h', 1: 'i', 2: 'i', 3: 'i', 4: 'i'}
  ```

## 3. rest params(나머지 매개변수)

```jsx
function sum(...nums) {
  return nums.reduce((total, el) => total + el);
}

function raceResults(gold, silver, ...everyoneElse) {
  console.log(`GOLD MEDAL GOES TO: ${gold}`);
  console.log(`SILVER MEDAL GOES TO: ${silver}`);
  console.log(`AND THANKS TO EVERYONE ELSE: ${everyoneElse}`);
}
```

- 점 3개를 사용하여 전개 구문과 비슷해 보이지만 전혀 다른 기능
- 함수가 정해지지 않은 수의 매개변수를 배열로 받을 수 있음
  - 점 3개로 매개변수 목록에 들어가 남은 인수를 모두 모아 실제 배열에 넣음
  - 실제 배열이므로, 배열 메서드 사용 가능
- 규칙
  - 매개변수 앞에 `…` 을 붙여 사용
  - 마지막 매개변수만 나머지 매개변수 사용 가능
  - 나머지 매개변수는 하나만 사용 가능
  - 다른 매개변수와 함께 사용 불가 → 단독 사용만 가능
  - 나머지 매개변수에는 앞에 정의된 매개변수를 만족한 이후의 인수들을 받아옴

### 1) arguments object(인수 객체)

```jsx
function sumAll() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

sumAll(8, 4, 3, 2); // 17
```

- 함수에 전달된 인수에 해당하는 배열 형태의 객체 → **실제 배열이 아님!**
- 모든 함수 내에서 이용 가능한 지역 변수
- 해당 객체를 사용하여 함수 내에서 모든 인수를 참조할 수 있으며, 호출할 때 제공한 인수 각각에 대한 항목을 갖고 있음
  - 항목의 인덱스는 0부터 시작
- 화살표 함수 사용 불가
- ES6부터는 나머지 매개변수 사용하는 것을 권고

## 4. 구조분해할당

- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식
- 배열이나 객체에서 값을 추출하기 좋은 방법

### 1) 배열에서 구조분해할당

```jsx
const scores = [929321, 899341, 772739, 543671, 243567, 111934];
const [gold, silver, bronze, ...everyoneElse] = scores;
// gold = 929321
// silver = 899341
// bronze = 772739
// everyoneElse = [543671, 243567, 111934]
```

- 배열에서의 순서와 구조분해할당에서의 순서는 동일 → 순서 중요!

### 2) 객체에서 구조분해할당

```jsx
const user = {
  email: 'harvey@gmail.com',
  password: 'sCoTt1948sMiTh',
  firstName: 'Harvey',
  lastName: 'Milk',
  born: 1930,
  died: 1978,
  bio: 'Harvey Bernard Milk was an American politician and the first openly gay elected official in the history of California, where he was elected to the San Francisco Board of Supervisors',
  city: 'San Francisco',
  state: 'California',
};

const { email, firstName, lastName, city, bio } = user;
// email = 'harvey@gmail.com'
// firstName = 'Harvey'
// lastName = 'Milk'
// city = 'San Francisco'
// bio = 'Harvey Bernard Milk was an American politician and the first openly gay elected official in the history of California, where he was elected to the San Francisco Board of Supervisors'

// 원본 객체의 키 이름을 변경하고 싶을 때
const { born: birthYear, died: deathYear = 'N/A' } = user;
// born이 아닌 birthYear로 접근해야 해당 값 사용 가능

// 원본 객체에 키-값을 추가하고 싶을 때, 키 = "값"을 사용하여 기본 값 설정 가능
const user2 = {
  email: 'Stacy@gmail.com',
  firstName: 'Stacy',
  lastName: 'Gonzalez',
  born: 1987,
  city: 'Tulsa',
  state: 'Oklahoma',
};

const { city, state, died = 'N/A' } = user2;
```

- 순서에 상관없이 키 값을 기준으로 구조분해할당

### 3) 매개변수에서 구조분해할당

```jsx
const user = {
  firstName: 'Harvey',
  lastName: 'Milk',
};

function fullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

fullName(user); // Harvey Milk

const movies = [
  {
    title: 'Amadeus',
    score: 99,
    year: 1984,
  },
  {
    title: 'Sharknado',
    score: 35,
    year: 2013,
  },
  {
    title: '13 Going On 30',
    score: 70,
    year: 2004,
  },
  {
    title: 'Stand By Me',
    score: 85,
    year: 1986,
  },
];

const print = movies.map(({ title, score, year }) => {
  return `${title} (${year}) is rated ${score}`;
});
// ['Amadeus (1984) is rated 99', 'Sharknado (2013) is rated 35',
// '13 Going On 30 (2004) is rated 70', 'Stand By Me (1986) is rated 85']
```

- 중괄호를 사용하여 특정 이름으로 객체를 구조분해할당하여 사용 가능
