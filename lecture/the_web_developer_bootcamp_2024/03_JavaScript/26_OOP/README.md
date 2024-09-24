# Prototypes, Classes & OOP

## 1. Object Prototype

### 1) 프로토타입 기반 언어

- JavaScript에서는 객체를 상속하기 위하여 프로토타입이라는 방식을 사용
- JavaScript는 프로토타입 기반 언어(prototype-based language)라 불림

  - 모든 객체들이 메소드와 속성들을 상속받기 위한 템플릿으로써, 프로토타입 객체를 가진다는 의미
  - 프로토타입 객체도 또 다시 상위 프로토타입 객체로부터 메소드와 속성을 상속받을 수 있고, 그 상위 프로토타입 객체도 마찬가지임

    → 이를 프로토타입 체인(prototype chain)이라 부름

    → 다른 객체에 정의된 메소드와 속성을 한 객체에서 사용할 수 있도록 하는 근간

- 상속되는 속성과 메소드들은 각 개체가 아니라 객체의 생성자의 `prototype` 속성에서 파생된 `__proto__` 속성으로 객체 인스턴스를 구현
  - 이 연결을 따라 프로토타입 체인을 타고 올라가며 속성과 메소드를 탐색

### 2) prototype 과 **proto**

- `prototype` : 메서드를 추가하거나 속성을 추가하는 실제 객체, 템플릭 객체
- `__proto__` : 해당 객체에 대한 프로토타입의 레퍼런스, 실제 템플릿을 참조하는 속성

## 2. OOP(Object Oriented Programming, 객체지향적 프로그래밍)

- 데이터가 ‘객체’ 내에 캡슐화 되고, 구성 요소 부분이 아닌 객체 자체가 운용되는 프로그래밍 접근 방식

## 3. Factory Functions(팩토리 패턴, 팩토리 함수)

```jsx
function makeColor(r, g, b) {
  const color = {};

  color.r = r;
  color.g = g;
  color.b = b;

  color.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  };

  color.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  return color;
}

const firstColor = makeColor(35, 255, 150);
firstColor.hex(); //firstColor.hex();
firstColor.rgb(); //"rgb(35, 255, 150)"

const black = makeColor(0, 0, 0);
black.rgb(); //"rgb(0, 0, 0)"
black.hex(); //"#0000s00"
```

- 팩토리 패턴을 사용하면 함수를 호출하는 것으로 객체를 만들어낼 수 있음

  → `new` 키워드를 사용하는 대신 함수 호출의 결과로 객체를 만들 수 있는 것

- 장점
  - 동일한 프로퍼티를 가진 여러 작은 객체를 만들어낼 때 유용
  - 현재의 환경이나 사용자의 특징적인 설정을 통해 원하는 객체를 쉽게 만들 수 있음
- 단점
  - `new` 키워드 없이 객체를 만드는 것에서 크게 벗어나지 않음
  - ES6의 화살표 함수를 이용하면 간결하게 작은 팩토리 함수를 만들 수 있음
  - 대부분의 상황에서 객체를 하나하나 만드는 것보다 클래스를 활용하는 편이 메모리 절약에 더 효과적

## 4. Constructor Functions(생성자 패턴, 생성자 함수)

```jsx
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

//If you call it on its own like a regular function...
Color(35, 60, 190); //undefined
//It returns undefined. Seems useless!

// *****************
// THE NEW OPERATOR!
// *****************

// 1. 빈 일반 자바스크립트 객체를 생성
// 2. 이 객체를 다른 객체에 연결(생성자 설정)
// 3. 1단계에서 새로 생성한 객체를 이 컨텍스트로 전달
// 4. 함수가 자체 객체를 반환하지 않으면 이 객체를 반환

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
  const { r, g, b } = this;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const color1 = new Color(40, 255, 60);
color1.hex();
const color2 = new Color(0, 0, 0);
color2.hex();
```

- `new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있음

  예) 복수의 사용자, 메뉴 내 다양한 아이템 등을 객체로 표현하려고 하는 경우

### 1) 생성자 함수(constructor function)

- 일반 함수에 기술적인 차이는 없지만 다음과 같은 관례를 따름
  1. 함수 이름의 첫 글자는 대문자로 시작
  2. 반드시 `new` 연산자를 붙여 실행
- 알고리즘 동작 과정

  1.  빈 객체를 만들어 `this` 에 할당

      ```jsx
      function User(name) {
        this.name = name;
        this.isAdmin = false;
      }

      let user = new User('보라');

      alert(user.name); // 보라
      alert(user.isAdmin); // false
      ```

  2.  함수 본문을 실행
      `this` 에 새로운 프로퍼티를 추가해 `this` 를 수정

          ```jsx
          function User(name) {
            // this = {};  (빈 객체가 암시적으로 만들어짐)

            // 새로운 프로퍼티를 this에 추가함
            this.name = name;
            this.isAdmin = false;

            // return this;  (this가 암시적으로 반환됨)
          }
          ```

  3.  `this` 를 반환

      ```jsx
      let user = {
        name: '보라',
        isAdmin: false,
      };
      ```

### 2) `new` 연산자

- 사용자 정의 객체 타입 또는 내장 객체 타입의 인스턴스를 생성
- 사용자 정의 객체를 생성하는 단계
  1. 함수를 작성하여 객체 타입을 정의
     1. 객체의 타입을 정의하기 위해, 객체의 이름과 속성을 명세하는 함수를 만듦
     2. 객체는 그 자체가 또 다른 객체인 속성을 가질 수 있음
  2. `new` 연산자로 객체의 인스턴스를 생성

## 5. JavaScript Class

```jsx
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }

  innerRGB() {
    const { r, g, b } = this;
    return `${r}, ${g}, ${b}`;
  }

  rgb() {
    return `rgb(${this.innerRGB()})`;
  }

  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

const red = new Color(255, 67, 89, 'tomato');
const white = new Color(255, 255, 255, 'white');
```

### 1) 기본 문법

```jsx
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

// 사용법:
let user = new User('John');
user.sayHi();

// 동작과정
// 1. 새로운 객체가 생성
// 2. 넘겨받은 인수와 함께 constructor가 자동으로 실행
//    이때 인수 "John"이 this.name에 할당
// 3. 이런 과정을 거친 후에 user.sayHi() 같은 객체 메서드를 호출 가능
```

- `constructor()`

  - 객체의 기본 상태를 설정해주는 생성자 메서드
  - `new`에 의해 자동으로 호출

    → 특별한 절차 없이 객체를 초기화 가능

### 2) 클래스란?

- 함수의 한 종류
- 기존 문법을 쉽게 읽을 수 있게 만든 문법을 편의 문법(syntactic sugar, 문법 설탕)이라고 함

## 6. Extends and Super

```jsx
class Pet {
  constructor(name, age) {
    console.log('IN PET CONSTRUCTOR!');
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    console.log('IN CAT CONSTRUCTOR!');
    super(name, age);
    this.livesLeft = livesLeft;
  }
  meow() {
    return 'MEOWWWW!!';
  }
}

class Dog extends Pet {
  bark() {
    return 'WOOOF!!';
  }
  eat() {
    return `${this.name} scarfs his food!`;
  }
}
```

- 클래스 상속을 사용하면 클래스를 다른 클래스로 확장할 수 있음
- 기존에 존재하던 기능을 토대로 새로운 기능을 만들 수 있음

### 1) `extends` 키워드

- 클래스 확장 문법
- 자바스크립트의 내장 객체는 프로토타입을 기반으로 상속 관계를 맺음

### 2) 메서드 오버라이딩

- `super.method(...)`는 부모 클래스에 정의된 메서드, `method`를 호출
- `super(...)`는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 할 수 있음
- 화살표 함수는 `super`를 지원하지 않음

### 3) 생성자 오버라이딩

- `super(...)`는 `this`를 사용하기 전에 반드시 호출해야 함

  - 일반 클래스가 `new`와 함께 실행되면, 빈 객체가 만들어지고 `this`에 이 객체를 할당
  - 반면, 상속 클래스의 생성자 함수가 실행되면, 일반 클래스에서 일어난 일이 일어나지 않음

    → 상속 클래스의 생성자 함수는 빈 객체를 만들고 `this`에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대

- 이런 차이 때문에 상속 클래스의 생성자에선 `super`를 호출해 부모 생성자를 실행해 주어야 함
  - 그렇지 않으면 `this`가 될 객체가 만들어지지 않아 에러가 발생

### 4) `super` 키워드

- 객체 리터럴 또는 클래스의 [[Prototype]] 속성에 접근하거나 슈퍼클래스의 생성자를 호출하는 데 사용
- `super`의 참조는 메서드가 호출된 객체가 아니라 `super`가 선언된 클래스 또는 객체 리터럴에 의해 결정
- 메서드를 바인딩 해제하거나 다시 바인딩해도 메서드의 `super` 참조는 변경되지 않음
