---
'@mindlogic-ai/logician-ui': patch
---

Markdown: 한국어 산문이 괄호로 감싼 URL의 자동 링크 경계를 바로잡습니다.

`입시 홈페이지(https://kbu.ac.kr/efms/Main.do)의` 처럼 URL을 괄호로 감싸고 뒤에 조사를 붙이면, GFM 자동 링크가 `)의`까지 href에 넣어 존재하지 않는 주소로 연결됐습니다. GFM은 URL 바로 뒤의 닫는 괄호만 떼어내기 때문에 조사가 한 글자라도 붙으면 방어가 풀립니다. remark-gfm 뒤에 도는 `remarkTrimAutolink` 플러그인이 짝 없는 닫는 괄호에서 href를 자르고, 넘친 꼬리는 링크 밖 일반 텍스트로 내보냅니다. 저자가 `[텍스트](URL)`로 직접 쓴 링크는 건드리지 않습니다.

같은 보정이 채팅 위젯(@mindlogic-ai/chatapi-web-sdk #353)에 먼저 들어갔고, 이 PR은 콘솔 대화내역 등 logician-ui `Markdown`을 쓰는 화면에 같은 동작을 맞춥니다.
