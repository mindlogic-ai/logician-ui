---
'@mindlogic-ai/logician-ui': minor
---

BottomSheet: `BottomSheetContent`에 `dragDisabled`를 추가한다. 켜면 본문과 손잡이 어디서도 시트를 끌 수 없고, 손잡이는 그대로 그린다. 저장 안 한 변경이 있어 닫기를 확인받는 동안 쓴다. zag는 `onOpenChange`가 있으면 끌린 시트를 제자리로 돌리지 않아서, 끌어서 닫기를 막기만 하면 시트가 놓은 자리에 멈춘다.

`onDisabledDrag`도 추가한다. `dragDisabled`가 켜진 동안 본문이나 손잡이에서 아래로 쓸어 내리면(10px 이상, 옆보다 아래로 더) 손짓 하나에 한 번 부른다. 시트는 움직이지 않으니, 여기서 X와 같은 확인 창을 띄워 왜 안 닫히는지 알려 준다.
