---
'@mindlogic-ai/logician-ui': minor
---

`CountBadge` is now `NotificationBadge`. `CountBadge`, `CountBadgeProps` and
`CountBadgeSize` stay as deprecated aliases until 6.0. The data attribute is
now `data-notification-badge` (was `data-count-badge`).

`NotificationBadge` can wrap the icon or avatar it sits on (`children`): it
floats at the top-end corner, `ringColor` draws a 2px ring outside the badge in
the colour behind it, and `invisible` hides the badge but keeps the icon.
`floatOffset` moves it in from the corner.
