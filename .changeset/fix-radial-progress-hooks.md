---
"@mindlogic-ai/logician-ui": patch
---

Fix RadialProgress useToken hooks rule violation

- Resolve "Rendered fewer hooks" error by calling useToken at component top level instead of inside map callbacks
