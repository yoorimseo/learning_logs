# 기타 유용한 CSS 속성

## 1. 불투명도 및 알파 채널

- rgba: 0(투명)~1(불투명) 사이의 숫자를 사용하여 투명도 조절
- Hex : 00~FF 사이의 숫자를 문자를 사용하여 투명도 조절
- `rgba(255, 255, 255, 0)`
  - alpha 채널은 불투명도를 지정
  - 해당 속성을 적용한 요소에만 투명도가 조정됨
- `opacity` 속성은 하위 모든 속성의 투명도에 영향을 미침

## 2. Position(위치) 속성

- `static` : 기본 값
  - 요소를 일반적인 문서의 흐름에 따라 배치
  - 해당 속성이 적용되어 있으면 상하좌우 값에 따라 오프셋을 적용
- `relative`
  - 요소를 일반적인 문서의 흐름에 따라 배치
  - 자기 자신을 기준으로 상하좌우 위치 속성 적용 가능
- `absolute`
  - 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않음
  - 위치가 지정된 가장 가까운 조상에 대해 상대적으로 배치
    - 조상 중 위치가 지정되어 있는 것이 없다면 컨테이너 블록이 기준
- `fixed`
  - 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않음
  - 뷰포트의 초기 컨테이닝 블록을 기준으로 삼아 배치
    - 단, 요소의 조상 중 하나가 `transform`, `perspective`, `filter` 속성 중 어느 하나라도 `none`이 아니라면 뷰포트 대신 그 조상을 컨테이닝 블록으로 삼음
  - 스크롤을 해도 항상 해당 위치에 고정되어 있음
- `sticky`
  - 요소를 일반적인 문서 흐름에 따라 배치
  - 테이블 관련 요소를 포함해 가장 가까운/스크롤 되는 조상과/표 관련 요소를 포함한 컨테이닝 블록(가장 가까운 블록 레벨 조상)을 기준으로 상하좌우 값에 따라 오프셋을 적용
    - 이 오프셋은 다른 요소에 영향을 주지 않음

## 3 Transition(전환) 속성

```css
/* property name | duration | timing function | delay */
transition: margin-left 4s ease-in-out 1s;
```

→ 경마게임 만들 때 timing function을 사용하면 좋을 것 같음

## 4. Transform(변환) 속성

```css
/* 다중 함수 값 */
transform: translateX(10px) rotate(10deg) translateY(5px);
transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);
```

- 요소에 회전, 크기 조절, 기울이기, 이동 효과를 부여
- 부모 요소에 적용하면 자식 요소를 포함하여 모두 적용됨

## 5. Background

```css
background-image: url(../../...);
backgroung-size: cover;
background-position: center; /* 배경 이미지 시작 위치 */
```

- 한 줄로 작성할 때 다음과 같은 순서를 지켜야 함

  → `background-position/backgroung-size`

## 6. Google Font

[Browse Fonts - Google Fonts](https://fonts.google.com/)
