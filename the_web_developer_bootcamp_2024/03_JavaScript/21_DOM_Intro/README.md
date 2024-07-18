# DOM

## 1. DOM 소개

- Document Object Model의 약자
- 문서의 구조화된 표현(structured representation)을 제공
- 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공
  - 문서 구조, 스타일, 내용 등을 변경 가능
- nodes와 objects로 문서를 표현
  - 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할
- DOM 은 동일한 문서를 표현하고, 저장하고, 조작하는 방법을 제공
  - DOM 은 웹 페이지의 객체 지향 표현
  - JavaScript와 같은 스크립팅 언어를 이용해 DOM 을 수정

# [1] 요소 선택하기

## 2. Document Object

### 1) getElementById

```jsx
document.getElementById('id');
```

- 주어진 문자열과 일치하는 `id` 속성을 가진 요소를 찾고, 이를 나타내는 `Element` 객체(DOM 객체)를 반환
- ID는 문서 내에서 유일해야 하기 때문에 특정 요소를 빠르게 찾을 때 유용

### 2) getElementsByTagName

```jsx
document.getElementsTagName('tagName');
```

- `Element`의 `HTMLCollection`과 주어진 태그명을 반환

  - `HTMLCollection` : 요소의 문서 내 순서대로 정렬된 일반 컬렉션(arguments 처럼 배열과 유사한 객체)을 나타내며, 릿트에서 선택할 때 필요한 메서드와 속성을 제공

        → 문서가 바뀔 때 실시간으로 업데이트 됨

  - 루트 노드를 포함해 전체 다큐먼트를 대상으로 검색

- 반환된 `HTMLCollection` 은 살아있음
  - 이는 `document.getElementsByTagName()` 을 다시 호출하지 않아도 자동으로 업데이트하여 DOM 트리와 동기화된 상태를 유지함을 의미

### 3) getElementsByClassName

```jsx
document.getElementsByClassname('className');
```

- `Document` 인터페이스의 `getElementsByClassName()` 메소드는 주어진 클래스 이름을 모두 가진 `HTMLCollection` (모든 하위 요소의 배열과 유사한 객체)을 반환
- 문서 개체에서 호출되면 루트 노드를 포함하여 전체 문서가 검색됨
- 모든 요소에서 `getElementsByClassName()`을 호출 가능
- 주어진 클래스 이름을 가진 지정된 루트 요소의 자손인 요소만 반환

### 4) querySelector

```jsx
document.querySelector(selectors);
// selectors: 하나 이상의 선택자를 포함한 DOMString, 유효한 CSS 선택자여야 함

//예시)
document.querySelector('TagName');
document.querySelector('#id');
document.querySelector('.class');
document.querySelector('input[type=""]');
```

- 제공한 선택자와 일치하는 문서 내 첫 번째 `Element`를 반환
  - 일치하는 요소가 없으면 `null`을 반환
- 탐색은 깊이우선(depth-first) 전위(pre-order)순회
  - 문서의 첫 번째 요소부터 시작해 자식 노드의 수를 기준으로 순회

### 5) querySelectorAll

```jsx
document.querySelectorAll(selectors);
// selectors: 하나 이상의 선택자를 포함한 DOMString, 유효한 CSS 선택자여야 함
```

- 제공한 선택자와 일치하는 문서 내 모든 `Element`를 반환
- 지정된 `Selector` 그룹에 일치하는 `Document`의 `Element List`를 나타내는 정적(살아 있지 않은) `NodeList` 를 반환

# [2]선택한 요소 조작하기

## 3. innerHTML, textContent, & innerText

### 1) innerHTML

```jsx
const content = htmlElement.innerHTML;
// htmlElement = document.querySelector etc...
```

- 요소(element) 내에 포함 된 HTML 또는 XML 마크업을 가져오거나 설정

### 2) innerText

```jsx
const content = htmlElement.innerText;
// htmlElement = document.querySelector etc...
```

- 요소와 그 자손의 렌더링 된 텍스트 콘텐츠
- 사용자가 커서를 이용해 요소의 콘텐츠를 선택하고 클립보드에 복사했을 때 얻을 수 있는 텍스트의 근삿값을 제공

### 3) textContent

```jsx
const content = htmlElement.textContent;
// htmlElement = document.querySelector etc...
```

- 노드와 그 자손의 텍스트 콘텐츠를 표현
- **innerText와의 차이점**
  | textContent | innerText |
  | --- | --- |
  | `<script>`와 `<style>` 요소를 포함한 모든 요소의 콘텐츠를 가져옴 | "사람이 읽을 수 있는" 요소만 처리 |
  | 노드의 모든 요소를 반환 | 스타일링을 고려하며, "숨겨진" 요소의 텍스트는 반환하지 않음 |
- **innerHTML과의 차이점**

  | textContent               | innerHTML               |
  | ------------------------- | ----------------------- |
  | HTML로 분석할 필요가 없음 | 이름 그대로 HTML을 반환 |
  | XSS 공격의 위험이 없음    |                         |

## 4. Attributes(속성)

### 1) `element.attribute` 속성 접근자

```jsx
document.querySelector('요소').속성;

// 예)
const element = document.querySelector('a');
console.log(element.href); // "https://example.com"
```

- DOM의 객체의 속성에 직접 접근
- 주로 표준 HTML 속성에 사용
  - id, className, href, src 등과 같은 속성에 접근할 때 유용
- DOM 객체의 속성은 JavaScript의 객체의 프로퍼티(property)로 제공
- Boolean 속성(checked, selected 등)에 접근할 때는 true 또는 false 반환

### 2) **`element.getAttribute('attribute')` 속성 메서드**

```jsx
document.querySelector('요소').getAttrubute('속성');

// 예)
const element = document.querySelector('a');
console.log(element.getAttribute('href')); // "/relative/path" or "https://example.com"
```

- HTML 속성 값을 가져옴
- 모든 HTML 속성에 접근 가능
- 속성의 원시 값을 문자열로 반환
- 요소에 실제로 설정된 속성 값을 가져오므로, 표준 속성뿐만 아니라 비표준 속성도 다룰 수 있음

> 📌 **두 개의 차이점**
>
> - 접근 방식
> - `element.attribute`는 DOM 객체의 프로퍼티로 접근
> - `element.getAttribute('attribute')`는 HTML 속성의 값을 가져오는 메서드
> - 반환 값의 형태
> - `element.attribute`는 JavaScript 프로퍼티 타입으로 반환
> - `element.getAttribute('attribute')`는 항상 문자열로 반환
> - 지원 속성
> - `element.attribute`는 주로 표준 속성에 사용
> - `element.getAttribute('attribute')`는 모든 속성에 사용 가능
> - Boolean 속성 처리
> - `element.attribute`는 Boolean 속성을 `true`나 `false`로 반환
> - `element.getAttribute('attribute')`는 설정된 문자열 값을 반환

```jsx
// 속성을 변경
document.querySelector('요소').setAttribute('속성', '변경하려고 하는 것');
```

## 5. 스타일 바꾸기

### 1) 인라인 스타일에 접근해서 바꾸기

```jsx
// HTML 인라인 스타일에 접근
Document.querySelector('요소').style.'스타일' = '변경값';

// 현재 설정된 값 확인 가능
window.getComputedStyle('요소').'스타일';
```

- - 를 사용하지 않고 camel case로 사용

### 2) ClassList

```jsx
// 해당 요소에 사용된 클래스들을 반환
const elementClass = document.querySelector('요소').classList;

// 클래스 추가
elementClass.add('클래스');

// 클래스 삭제
elementClass.remove('클래스');

// 인덱스를 사용하여 클래스 값 반환
elementClass.item(number);

// 클래스 값 토글링
// - 인수가 하나일 때 :
//   클래스가 존재하면 제거하고 false 반환, 존재하지 않으면 클래스를 추가하고 true 반환
// - 인수가 두개일 때:
//   두번째 인수가 true로 평가되면 지정한 클래스 값을 추가, false로 평가되면 제거
elementClass.toggle('클래스', '클래스');

// 클래스 속성이 존재하는지 확인
elementClass.contains('클래스');

// 존재하는 클래스를 새로운 클래스로 교체
elementClass.replace(oldClass, newClass);
```

- 한 요소에서 클래스를 제어/회수/조작하기 위해 상호작용 할 수 있는 개체

## 6. Parent/Child/Sibling

```jsx
// 1) parent
// 해당 요소의 부모 요소를 반환, 직계 부모는 1개만 존재
const parent = document.querySelector('요소').parentElement;

// 2) child
// 해당 부모 요소의 자식 요소를 반환, 인덱스로 개별 접근 가능, 자식은 여러 개 존재 가능
parent.children;

// 3) sibling
const one = document.querySelector('요소');

// 부모의 childNodes 목록에 지정된 노드 바로 다음에 있는 노드를 반환
// 마지막 노드이면 null 값을 반환
one.nextSibling;

// 읽기전용 속성
// 현재 호출하는 노드가 속해 있는 부모의 childNodes 목록에서 특정 자식 노드를 리턴
// childNodes 목록의 첫번째 노드일 경우 null 값을 리턴
one.previousSibling;

// 노드와 상관없이 해당 요소의 다음 요소를 반환
one.nextElementSibling;

// 노드와 상관없이 해당 요소의 이전 요소를 반환
one.previousElementSibling;
```

## 7. 새로운 DOM 요소 생성 및 추가

```jsx
const something = document.createElement('요소');

// 추가하는 요소는 위치할 요소의 마지막에 추가됨
// 1) appendChild
위치할요소.appendChild('something');

// 2) append : 하나 이상의 요소 추가 가능, 문자열 텍스트 전달 가능
const p = document.querySelector('p');
p.append('Hello~');

// 3) prepend : 위치할 요소의 맨 앞에 추가
const newB = document.createElement('b');
newB.append('HI!);
p.prepend(newB);

// 4) insertAdjacentElement(position, element) : 요소와 요소 사이에 추가
// beforebegin: targetElement 자체 앞
// afterbegin: targetElement 바로 안, 첫 번째 자식 앞
// beforeend': targetElement 바로 안, 마지막 자식 뒤
// afterend: targetElement 자체 뒤
const h2 = document.createElement('h2');
h2.append('Hello everyone!');
const h1 = document.querySelector('h1');
h1.insertAdjaccentElement('afterend', h2);

// 5) after : 해당 요소의 바로 다음에 추가
let container = document.createElement("div");
let p = document.createElement("p");
container.appendChild(p);
let span = document.createElement("span");

p.after(span);

console.log(container.outerHTML);
// "<div><p></p><span></span></div>"

// 6) before : 해당 요소의 바로 앞에 추가
let container = document.createElement("div");
let p = document.createElement("p");
container.appendChild(p);
let span = document.createElement("span");

p.before(span);

console.log(container.outerHTML);
// "<div><span></span><p></p></div>"
```

## 8. DOM 요소 제거

```jsx
// 1) remoceChild : DOM에서 자식 노드를 제거하고 제거된 노드를 반환
// 제거하려는 요소의 부모 요소에 접근하여 하위 요소로 다시 접근해 제거해야 하는 번거로움 존재
<div id="parent">
  <div id="child"></div>
</div>

const parent = document.getElementById("parent");
const child = document.getElementById("child");
const throwawayNode = parent.removeChild(child);

// 2) remove : DOM에서 해당 요소를 바로 제거
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
<div id="div-03">Here is div-03</div>

const element = document.getElementById("div-02");
element.remove(); // Removes the div with the 'div-02' id
```
