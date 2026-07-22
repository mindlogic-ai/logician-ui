---
'@mindlogic-ai/logician-ui': patch
---

Fix neutral semantic tokens that were shadowed by Chakra's defaults in light mode.

`border.subtle`, `fg.muted`, and `fg.subtle` were declared with `base` values,
but Chakra's own default theme already defines these tokens with a `_light`
condition (`border.subtle: { _light: gray.50 }`, `fg.muted: { _light: gray.600 }`,
`fg.subtle: { _light: gray.400 }`). A `_light` condition outranks `base` in light
mode, so after the theme merge Chakra's values won and ours never rendered:

- `border.subtle` → gray.50 (near-white) instead of our gray.200 — low-emphasis
  dividers and artifact frames were effectively invisible on a light canvas.
- `fg.muted` → gray.600 instead of our gray.900 — secondary text shipped lighter
  than intended.
- `fg.subtle` → gray.400 instead of our gray.700 — tertiary / placeholder / icon
  text shipped much lighter than intended.

(The source comments for `fg.muted`/`fg.subtle` said "Light value … is unchanged",
which was true of the *intent* but not of what actually rendered.) Dark mode was
always correct because those tokens set `_dark` explicitly, which does override
Chakra's `_dark`.

Pin `_light` (instead of `base`) on each so our values win deterministically —
the same pattern the `bg`/`fg`/`border` `DEFAULT` tokens already use, and the
same fix consumers had been applying downstream. `bg.subtle`/`bg.muted`/`bg.panel`
are also moved to `_light` for consistency; their values already matched
Chakra's, so those three are a no-op (defensive, so they don't silently break if
the value ever changes).

These six are the entire collision set: the only neutral tokens whose names
match a Chakra default that carries a `_light`. Every other `base` token in the
file is safe — the brand ramps (`primary`/`secondary`/`danger`/`success`/
`warning.*`) and the numeric `gray.0–1500` scale have no Chakra default, and the
fresh-named neutrals (`bg.canvas`/`surface`/`raised`/`sunken`/`track`/`inverse`,
`fg.emphasized`/`default`, `border.default`/`strong`, …) were named to sidestep
this exact shadowing (see the `bg.raised` comment). None of those are touched.
