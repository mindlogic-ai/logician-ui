---
'@mindlogic-ai/logician-ui': minor
---

MDXEditor 개선

- @mdxeditor/editor 패키지 업데이트 ^1.0.0 -> ^3.45.1
- <Box />가 이중으로 래핑되어 있어 containerProps가 제대로 적용되지 않는 문제 해결 (nesting 단계가 줄어들어 diff가 많아 보일 수 있음)
- forwardRef를 적용하여 디자인 시스템을 사용하는 쪽에서도 에디터의 ref에 접근할 수 있도록 추가
- 마크다운 구문 파싱 중 에러가 발생했을 때 Source Mode로 전환할 수 있도록 추가.
  - 외부에서도 onError를 prop으로 넘겨줄 수 있어서 Toast를 띄우는 등 커스텀 가능
