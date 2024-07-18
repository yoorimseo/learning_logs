# JavaScript 반복문

## 1. 반복문이란?

- 몇 가지 기능을 반복하는 기능
- 종류
  - `for`
  - `while`
  - `for … of`
  - `for … in`

### 1) for 문

```jsx
for (초기값; 조건식; 증감자) {
	...
}
```

### 2) 무한 루프

- 무한 루프는 JavaScript에 있는 메모리를 모두 사용하는 것
  - 반복이 멈추지 않기 때문
- 반복문을 쓸 때 어느 시점에 어떻게 멈추게 할지가 중요

### 3) 배열에서 반복문의 사용

```jsx
const array = {'a', 'b', 'c', 'd'};

for (let i = 0; i < array.length; i++) {
	console.log(i, array[i]);
}
```

### 4) 중첩 반복문

```jsx
for (let i = 0; i <= 10; i++) {
  console.log(`i is ${i}`);
  for (let j = 1; j < 4; j++) {
    console.log(`    j is ${j}`);
  }
}
```

### 5) while 문

```jsx
while (조건문) {
	// 종료문 필수
	...
}
```

- 반복 횟수를 모를 때 사용하기 좋음

### 6) break 문

- 반복문을 종료하는 구문

### 7) for … of 문

```jsx
for (변수 of 반복자) {
	...
}
```

### 8) 객체에서 반복문의 사용

```jsx
for (변수 in 객체) {
  // 변수 = 키
  // 객체[변수] = 값
}

Object.keys; // 키의 배열
Object.values; // 값의 배열
Object.entries; // [키, 값] 쌍의 배열
```
