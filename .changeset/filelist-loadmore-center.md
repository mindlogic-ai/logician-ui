---
'@mindlogic-ai/logician-ui': patch
---

fix(FileList): center the "see more" load-more button

The load-more button used `css={{ all: 'unset', display: 'flex' }}`, and
`all: unset` wiped the `w="100%"` prop while nothing set `justify-content`, so
the button shrank to its content and stuck to the left edge of the list instead
of reading as a centered full-width footer action. Restore `width: 100%` and add
`justifyContent: center` inside the css block.
