# 커피숍 구현하기

키오스크 없이 직원 1명이 일하는 커피숍을 구현해보자.

[ 메뉴 : 아메리카노, 카페라떼, 에이드, 스무디 ]

## 🎯 프로그래밍 요구 사항

- 1명의 직원이 주문도 받고 음료도 만든다.

  - 먼저 온 손님이 주문한 음료가 다 나와야 새로 주문을 받을 수 있다.

- 함수(또는 메서드)가 한 가지 일만 하도록 최대한 작게 만들자.

  - 다음과 같은 확장성을 고려하여 코드를 작성해보자.
    - 직원이 2명일 때, 주문과 제작을 따로 할 수 있다면?
    - 3명 이상의 직원이 음료 제작을 할 수 있다면?

- 비동기를 쓰지 않고 구현한다.
  - setTimeout을 사용하지 않는다.

## 🗒️ 실행 결과 예시

```text
[ 메뉴 : 아메리카노, 카페라떼, 에이드, 스무디 ]
주문할 음료와 갯수를 입력해주세요.
아메리카노 1, 카페라떼 1

아메리카노 제조중...(1초)
카페라떼 제조중...(2초)

주문하신 음료가 나왔습니다.
주문 내역 : 아메리카노 1잔, 카페라떼 1잔
```

```text
[ 메뉴 : 아메리카노, 카페라떼, 에이드, 스무디 ]
주문할 음료와 갯수를 입력해주세요.
아메리카노 1, 카페라떼 2

아메리카노 제조중...(1초)
카페라떼 제조중...(4초)

주문하신 음료가 나왔습니다.
주문 내역 : 아메리카노 1잔, 카페라떼 2잔
```

## 🚀 기능 구현 목록

1. 직원은 메뉴 목록을 보여주어야 한다.
2. 직원은 손님의 주문을 받아야 한다.
3. 손님은 주문할 메뉴와 갯수를 입력해야 한다.
4. 직원은 주문 받은 음료를 제작해야 한다.
5. 음료 제작이 끝나면, 직원은 손님에게 픽업 알림을 보내야 한다.
6. 이전 손님의 픽업이 완료되면, 직원은 새로운 주문을 받아야 한다.

## 🚨 예외 처리 목록
