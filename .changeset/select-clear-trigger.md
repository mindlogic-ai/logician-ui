---
'@mindlogic-ai/logician-ui': patch
---

Select, Combobox: `ClearTrigger` 에 디자인 시스템 스타일을 입힌다. × 는 12px(`3.5`)·`fg.icon` 으로 펼침 화살표(14px·`fg.muted`)보다 작고 옅게, 버튼은 `8` 크기로 그리고, 화살표와의 사이에 `border.subtle` 구분선을 둔다. × 가 보이는 동안은 값 끝에 × 와 구분선 자리를 비워, 긴 값이 × 아래로 들어가지 않고 말줄임으로 끝난다. 지금까지는 Chakra 기본값이라 21px × 가 화살표보다 컸다. 터치 화면에서는 누르는 영역을 값 쪽으로만 44px 까지 넓히고, 높이는 입력칸 높이에 맞춘다. 아이콘을 넘기지 않으면 `CloseIcon` 을 그리고, 접근 이름은 영어 「Clear value」 대신 provider 언어의 「선택 지우기」로 붙인다. 호출부에서 `aria-label` 을 넘기면 그 값이 우선한다.
