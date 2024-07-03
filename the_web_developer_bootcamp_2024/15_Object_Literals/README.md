# JavaScript 객체 리터럴

## 1. 객체란?

- 여러 데이터 조각을 어떠한 구조로 저장
- 객체 리터럴

  ```jsx
  const fitBitData = {
    // 키: 값
    totalSteps: 308727,
    totalMile: 211.7,
    avgCalorieBurn: 5755,
    workoutsThisweek: '5 of 7',
    avgGoodSleep: '2:13',
  };
  ```

  - Property = Key + Value
  - 키-값 쌍과, 데이터 저장소, 중괄호를 사용하여 만든 데이터 구조
  - 값으로 다양한 데이터 타입 사용 가능

## 2. 객체에 접근

### 1) 값에 접근

```jsx
Object['Key'];
Object.Key;
```

- Key로 사용된 모든 숫자, 문자는 문자열로 변환됨
- `.` 구문은 해당 객체 안에 있는 Key만 사용 가능

### 2) 새로운 키/값을 추가하거나 기존 값을 업데이트

```jsx
Object['Key'] = value;
Object.Key = value;
```

- 객체를 const로 선언해도 객체의 주소가 메모리에 저장되기 때문에, 내부 요소들은 변경 가능

## 3. 배열과 객체 중첩

```jsx
const student = {
  firstName: 'David',
  lastName: 'Jones',
  strengths: ['Music', 'Art'],
  exams: {
    midterm: 92,
    final: 88,
  },
};

const shopping = [
  {
    product: 'Jenga Classic',
    price: 6.88,
    quantity: 1,
  },
  {
    product: 'Echo Dot',
    price: 29.99,
    quantity: 3,
  },
  {
    product: 'Fire Stick',
    price: 39.99,
    quantity: 2,
  },
];
```
