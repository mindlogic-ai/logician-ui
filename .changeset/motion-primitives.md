---
'@mindlogic-ai/logician-ui': minor
---

Eight motion primitives, and the celebration band they needed.

FactChat had built its own motion layer — `src/components/motion/`, seven
components on a duplicated copy of these tokens, all of them on framer-motion.
Rebuilding them here answered a question the vocabulary alone could not: what
does the scale actually hold once real motion goes through it?

**`Pulse`** pops once when `trigger` changes. **`Shake`** is its counterpart and
refuses; keep them apart, because a shake used as emphasis reads as an error.
Both replay through a changed `key` — a new element runs its animation from the
top, the same trick `stagger` uses to replay on reopen.

**`Appear`** brings an element in on mount: a fade, plus an optional scale (a
_stamp_) or travel (an _arrival_). It is the third of three entrances and the
one to reach for last — if the element can close, `presence`; if siblings arrive
with it, `stagger`; otherwise this. It does not animate out, because CSS cannot
animate a node being removed, which is the gap `presence` fills.

**`Reveal`** opens a block out of nothing through `grid-template-rows: 0fr → 1fr`
rather than measuring a height. `height: auto` is not interpolable, which is the
only reason this needed JavaScript before; the Accordion and ExpandableText
already open this way.

**`FlyTo`** arcs a ghost between two measured rects — JavaScript measures, CSS
animates. **`Confetti`** bursts. **`CountUp`** counts, and is the only thing here
CSS cannot animate at all, since a number is text.

**`SwapTransition`** slides one piece of content out and the next one in. It is
the one primitive that keeps React state, because the outgoing subtree has to
stay on screen long enough to leave while React has already been told to render
the new one. That is fifteen lines holding one child through one exit.

**No framer-motion.** It stays a devDependency.

## What the scale was missing

`motion.celebrate`, in two values — `burst` (900ms) and `fall` (1800ms) — split
for the reason `loop` splits into `turn` and `sweep`: the period is set by how
far the thing travels. Everything below it answers "how long until the interface
responded", and its ceiling was `slower` (700ms) because past that a response
reads as a wait. A celebration inverts that; it exists to be watched. Both
codebases had already written the literal.

`cubicBezier(curve)` evaluates a house curve for motion JavaScript has to drive
frame by frame. Without it, a count-up beside a card reaches for an
`easeOutCubic` off the internet and lands on a different curve from the card.

## And one place deliberately off the palette

`Confetti`'s default colours are literal hex. Semantic tokens mean things, and
raining the error red over "payment complete" says something the screen does not.
The palette is also built for interface legibility — average lightness 47%,
three of five in the blue range — so fifty pieces of it read as a chart legend
falling. The cost is stated rather than hidden: these do not follow a re-theme
and do not adapt to dark mode. `colors` is a prop for apps that need their own.
