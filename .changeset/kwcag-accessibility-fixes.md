---
'@mindlogic-ai/logician-ui': minor
---

Fix the accessibility defects a KWCAG 2.1 audit found in `Subtitle`, `SelectField`, `ComboboxField`, `Slider`, `Radio`, `FileInput`, `ErrorFallback` and the workflow `NodePalette`.

Every one of these was invisible in review — the screen looked right, and only the accessibility tree or the serialized markup said otherwise. Each is now held by a test in `src/components/a11y.kwcag.test.tsx`, named by the 검사항목 an evaluator works from.

**`Subtitle` renders a paragraph, not `<h6>`** (KWCAG 5.2.4.2 제목 제공). It was `Text as="h6"`, so every call site put a level-6 heading into the document outline: a sentence of helper copy announced as a heading, and a jump from whatever level preceded it (axe `heading-order`). A component chosen for its type scale should not decide the outline. Call sites that genuinely are the next heading say so themselves — `<Subtitle as="h2">` — which is where that is known. This also fixes `Pagination`'s page counter and `ErrorFallback`'s subtitle, both of which were `<h6>` by inheritance.

**`SelectField` and `ComboboxField` take an `ariaLabel`** (KWCAG 5.3.4.1 레이블 제공). The trigger's `aria-labelledby` is emitted whether or not the label part is rendered, so a field composed without a visible `label` was not merely unlabelled — the reference dangled and the control resolved to **no accessible name at all**, announcing as a bare "button" however much text it showed (axe `button-name`). Both now always render the label part: visibly when there is a `label`, visually hidden when the name lives elsewhere on screen (`ariaLabel`, falling back to `placeholder`). Rendered as a hidden label rather than an `aria-label` attribute so the name is in the server-rendered markup — an attribute applied after hydration leaves a window in which the control is nameless. `Pagination`'s rows-per-page select now passes its own name.

**`Slider` takes an `ariaLabel`** (KWCAG 5.3.4.1). Same shape of bug one layer down: Zag points each thumb's `aria-labelledby` at a label part, so a slider composed without one has unnamed thumbs (axe `aria-input-field-name`). Media controls — a seek bar beside a time display, a volume slider beside a mute button — are exactly the compositions that carry their label as an adjacent control.

**`Radio.Control` no longer emits a duplicate id** (KWCAG 5.4.1.1 마크업 오류 방지). Chakra derives the indicator's id from the same `ids.itemControl` as the control it sits inside, so every radio on a page shipped two elements with one id. Duplicate ids are still a live 검사항목 for Korean evaluators even though WCAG 2.2 dropped SC 4.1.1 — and `getElementById` returning whichever came first is its own bug. The indicator is the dot inside the control; nothing references it, so it takes a `useId()` value that stays stable across server and client render.

**`FileInput` drops two roles that were wrong** (KWCAG 5.4.2.1 웹 애플리케이션 접근성 준수). `role="button"` on the wrapper put the real `<input>` inside another interactive element (axe `nested-interactive`), and `role="group"` on a `<label>` is not an allowed pairing (`aria-allowed-role`). The label now carries `className="group"`, which is what Chakra's `_groupHover` actually compiles against (`.group:hover &`) — so the reveal-on-hover overlay, which had never fired, now works.

**`ErrorFallback` renders a landmark and an ordered outline** (KWCAG 5.2.4.1 반복 영역 건너뛰기 / 5.2.4.2). This card replaces whatever failed — often the whole page, taking the host's `<main>` with it — and left a screen-reader user with nothing to navigate by. It is now a `<section>` labelled by its own error title: a region landmark wherever it renders, which `<main>` would not be, since a segment-level boundary leaves the host's `<main>` in place and two of those is its own failure. The support-details block moves from `<h4>` to level 2, under the card's `<h1>`.

**The workflow `NodePalette` is a labelled region** rather than a level-6 heading. Its title is a `Subtitle`, so the tag fix above removed the `<h6>`; the panel now says what it is the way a panel should — `role="region"` named by that title.

**Not fixed here, and still worked around downstream:** the icon set's `<defs>` ids are named after the source file (`chat.svg` → `chat_svg__a`), so the same icon twice on a page is a duplicate id. That is an SVGR build-time constant, and making it per-instance means generating the ids at runtime — a change to the icon pipeline rather than to a component, and worth doing deliberately.
