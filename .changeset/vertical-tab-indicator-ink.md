---
'@mindlogic-ai/logician-ui': patch
---

The vertical tab's selected rail follows the label to ink.

Follow-up to the ink selection change in 4.0.0-alpha.28. That release moved the
selected tab's label and the horizontal underline to `fg.emphasized`, but the
VERTICAL rail draws its own 2px indicator in `verticalSelectedStyles._before`
rather than reading `TAB_RAMP.indicator` — so it stayed `primary.main`, leaving
an azure bar beside an ink label in both modes. That is precisely the
half-migrated look the change existed to remove.

It now reads through `TAB_RAMP.indicator`, so the two orientations cannot drift
apart again.
