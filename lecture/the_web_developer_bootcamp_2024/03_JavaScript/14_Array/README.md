# JavaScript 배열

## 1. 배열이란?

- 다양한 데이터 타입을 혼합하여 저장 가능
- 배열은 크기 조정이 가능

### 1) 배열 인덱스

- 인데스를 사용하여 배열의 특정 요소에 접근 가능
  - 인덱스는 0부터 시작
  - 마지막 인덱스는 `array.length - 1`
- 문자열과 달리 배열의 특정 요소를 인덱스로 접근하여 변경 가능

## 2. 배열 메서드 기본

- `array.push(value)` : 배열의 마지막에 새로운 요소를 추가
- `array.pop()` : 배열의 마지막 요소를 제거하고, 해당 요소를 반환
- `array.shift()` : 배열의 첫 번째 요소를 제거하고, 해당 요소를 반환
- `array.unshift(value)` : 배열의 맨 앞에 새로운 요소를 추가
- `array1.concat(array2)` : array1 + array2, 두개의 배열을 결합하여 새로운 변수에 저장
- `array.includes(value)` : 특정 값을 해당 배열이 가지고 있는지 boolean 값으로 반환
- `array.indexOf(value)` : 특정 값이 해당 배열에 몇 번째 인덱스에 해당하는지 가장 첫 번째 인덱스를 반환, 존재하지 않을 경우 -1 반환
- `array.reverse()` : 배열의 순서를 정반대로 변환
  - 원본 배열을 바꿈
- `array.slice(start, end)` : 배열의 인덱스 start부터 end-1까지 잘라서 반환
  - 인덱스를 음수로 하면 배열의 뒤에서부터 시작
- `array.splice(start, count, value)` : 배열의 기존 요소를 제거하거나, 새로운 요소를 추가할 수 있음
  - 원본 배열을 바꿈
  - 배열의 인덱스 start부터 count 만큼 삭제
  - value 값을 추가하면 배열의 start부터 count 만큼 지우고, 그 바로 다음에 value를 추가
    - 배열의 중간에 값을 업데이트 하는 것은 좋지 않음
- `array.sort()` : 배열을 정렬
  - 기본 정렬 기준은 오름차순
  - 함수를 사용하여 배열의 정렬 기준을 정할 수 있음
- `array.toString()` : 배열의 요소를 모두 더하여 문자열로 반환

## 3. 배열 참조 유형 및 동등성 테스트

- 배열에서의 비교는 내부 값을 비교하는 것이 아니라, 메모리의 참조와 비교
  - 등호는 메모리를 참조한 값과 비교
- 배열의 얕은 복사
  - `…` 연산자(전개구문)
  - `array.slice(start, end)`
  - `array.from(original_array)`
  - 배열의 얕은 복사는 같은 메모리 공간을 공유

## 4. 배열 + const

- 배열을 선언할 때 배열이라는 컨테이너가 메모리에 저장
- const로 선언해도 배열의 메서드를 사용하여 요소를 추가/삭제가 가능
  - 배열 안의 요소들을 변경하는 것이기 때문
  - 배열 자체를 바꾸는 것은 안됨

## 5. 다차원 배열
