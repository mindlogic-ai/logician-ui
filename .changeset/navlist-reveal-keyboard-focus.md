---
'@mindlogic-ai/logician-ui': patch
---

NavList `trailingActionVisibility="hover"`: the trailing action now shows on
hover, keyboard focus (`:focus-visible`) or an open menu. Before, any focus in
the row counted, so after a mouse click the row just opened kept its action
(and gave up its label's end) until the member clicked somewhere else.
