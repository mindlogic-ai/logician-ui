# logician-ui 5.0 codemod

jscodeshift transforms that move an app from logician-ui 4.x to 5.0. They
cover the static half of the migration: the 4.x `colorPalette × variant` grids
on Button, IconButton, Badge, Tag and Chip, `Card variant="gradient"`, and the
renamed colour tokens. Anything they cannot decide on their own is left in place
and listed in a report.

Plain CommonJS with no build step. jscodeshift 17 loads the files as they are.

## Run everything

```sh
# preview: changes nothing, prints the diff of each file and the report
npx jscodeshift -t node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js \
  --parser=tsx --extensions=tsx,ts --dry --print src/

# apply
npx jscodeshift -t node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js \
  --parser=tsx --extensions=tsx,ts src/
```

After applying, run Prettier, then `tsc` and the logician-ui ESLint rule
(`logician-ui/no-deprecated-tokens`). Read every `TODO(logician-ui 5.0)` comment
and every report line.

### Runner with a summary table

jscodeshift prints one `REP` line per site. It has no end-of-run hook, so it
cannot print a combined table itself. With `--dry` it does print per-kind counts
under `Stats:`. For the full table, run `index.js` with node. This needs
`jscodeshift` installed in the app (`npm i -D jscodeshift`):

```sh
node node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js --dry src/   # preview
node node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js src/         # apply
#   --print            print transformed files (with --dry)
#   --only=a,b         run only these transforms
#   --cpus=N           worker count (default: all cores)
#   --extensions=tsx,ts  (default tsx,ts,jsx,js; node_modules and *.d.ts are ignored)
```

The runner exits with code 0 even when some sites need a person, because the
report is the expected output. Exit code 1 means a crash.

## Run one transform

| transform         | file                 | what it does                                                                                                 |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `button-variants` | `button-variants.js` | `<Button>` / `<IconButton>`: `colorPalette`(or `colorScheme`) × `variant` → role `variant` + `isDestructive` |
| `badge-variants`  | `badge-variants.js`  | `<Badge variant="primary\|secondary\|neutral">` → no variant (neutral). success/warning/danger/info stay     |
| `tag-chip`        | `tag-chip.js`        | `<Chip>` → `<Tag>` (import fixed/merged) and the Tag colour grid → `tone` / `selected`                       |
| `card-gradient`   | `card-gradient.js`   | `<Card variant="gradient">` → variant removed + TODO                                                         |
| `token-renames`   | `token-renames.js`   | deprecated 4.x token names in strings → 5.0 names                                                            |

```sh
npx jscodeshift -t node_modules/@mindlogic-ai/logician-ui/codemods/5.0/token-renames.js \
  --parser=tsx --extensions=tsx,ts src/
# or: … /index.js --only=button-variants,tag-chip …
```

Only elements imported from `@mindlogic-ai/logician-ui` are touched, including
aliases (`import { Button as LButton }`) and namespace imports
(`<LUI.Button>`). Another library's `Button` or `Tag` is left alone.

## Mappings

"—" means the prop is absent. The Button and Tag/Chip mappings are the same
tables as the runtime back-compat in `src/components/Button/Button.legacy.ts`
and `mapLegacyTagProps` (`src/components/Tag/Tag.styles.ts`), so a call site
looks the same whether or not the codemod has run on it. A parity test in
`codemods.test.ts` runs both over the whole palette × variant grid. Every pair
the runtime warns about as having no exact 5.0 equivalent also gets a **TODO**.

**Button** (4.x default variant was `soft`)

| colorPalette / variant                       | 5.0                                                                |
| -------------------------------------------- | ------------------------------------------------------------------ |
| primary · neutral · — / solid                | `variant="primary"`                                                |
| danger / solid                               | `variant="danger"`                                                 |
| neutral · — · primary · secondary / outline  | `variant="secondary"`                                              |
| danger / outline                             | `variant="secondary" isDestructive`                                |
| neutral · — · primary / ghost                | `variant="ghost"`                                                  |
| danger / ghost                               | `variant="ghost" isDestructive`                                    |
| primary · neutral · secondary · — / soft · — | `variant="subtle"` (written out even though it is the 5.0 default) |
| danger / soft · —                            | `variant="subtle" isDestructive`                                   |
| secondary · warning · success / solid        | `variant="primary"` + **TODO**                                     |
| unknown variant (`link`, `plain`, …)         | `variant="subtle"` (+ `isDestructive` if danger) + **TODO**        |
| other off-table pairs (e.g. success/outline) | same as the runtime table + **TODO**                               |

**IconButton** (4.x default was neutral ghost; 5.0 default is ghost)

| colorPalette / variant                                                | 5.0                             |
| --------------------------------------------------------------------- | ------------------------------- |
| — · neutral · primary · warning / ghost · —, neutral · primary / soft | no `variant` (ghost)            |
| neutral · — / outline                                                 | `variant="secondary"`           |
| primary · neutral · — / solid                                         | `variant="primary"`             |
| danger / solid                                                        | `variant="danger"`              |
| danger / ghost · soft · —                                             | `isDestructive` (ghost)         |
| anything else                                                         | runtime-table result + **TODO** |

`colorPalette` and `colorScheme` are always removed. Elements that already
use a 5.0 role variant with no colour prop are left unchanged, so running the
codemod twice is safe.

**Tag / Chip** (Chip 4.x default was primary/soft; Tag 4.x default was neutral/soft)

| colour / variant                                       | 5.0                                               |
| ------------------------------------------------------ | ------------------------------------------------- |
| primary · secondary · neutral · — / soft · — · outline | plain `<Tag>`                                     |
| danger · success · warning / soft · —                  | `tone="danger"` etc.                              |
| primary · secondary · neutral · — / solid              | `selected` (reported as `selected`, see below)    |
| danger · success · warning / solid                     | `tone="…"` + **TODO** (5.0 Tag has no fill)       |
| danger · success · warning / outline                   | plain `<Tag>` + **TODO** (5.0 Tag has no outline) |
| unknown colour or variant                              | plain `<Tag>` + **TODO**                          |

The colour is what the runtime reads: on a Chip `colorScheme ?? colorPalette`
(then the primary default), on a Tag `colorPalette` only. A `colorScheme` on a
Tag was never read, so it is removed with a **TODO**. An explicit `tone` or
`selected` already on the element wins over the mapping.

Unmigrated, a solid pair gets the selected _look_ only. The explicit `selected`
prop the codemod writes also makes the tag a toggle (hover border, pointer,
`aria-pressed` on `as="button"`) — Tag has no public prop for the look without
that — so every such site is listed under `selected` in the report.

A converted `<Chip>` keeps Chip's pill shape, which the deprecated `Chip` alias
renders and a plain `<Tag>` does not (Tag is `md` radius, semibold):
`borderRadius="xl"` (the 32px token Chip uses) `px={3} py={2}
fontWeight="medium"`, placed first so a spread or a later prop still wins. A
prop the call site already sets is kept (`rounded` counts as `borderRadius`;
`p`/`padding` count as both paddings). Drop them by hand if the screen should
take the 5.0 Tag shape.

For Chip, the import specifier becomes `Tag`. If the file already imports
`Tag`, the two imports are merged and `TagLabel` and the rest are kept. If
`Tag` is already bound to something else in the file, the codemod imports
`Tag as LuiTag`.

**Tokens.** The map comes from `src/theme/deprecatedColorTokens.json`, the same
file the theme aliases and the ESLint rule use. Matching uses whole tokens only,
with the rule's boundaries: `primary.light` does not match inside
`primary.lighter`, `foo.primary.light` or `theme.colors.primary.light`, and
`slate.100` does not match inside `slate.1000`. The one prefix allowed is
Chakra's own token reference, `colors.`, when it starts the string or follows
`{`, a quote or `token(`: `'{colors.success.main}'`,
`'color-mix(in oklab, {colors.warning.fill} 70%, black)'`,
`token('colors.danger.main')` and a plain `'colors.primary.light'` are renamed
with the prefix kept (`{colors.success.solid}`); `{colors.grayDark.200}` is
reported as a primitive. The transform rewrites string literals, JSX string
attributes and template-literal parts, in dotted form (`slate.300` →
`neutral.5`) and CSS-var form (`--chakra-colors-slate-300` →
`--chakra-colors-neutral-5`). CSS variable names are matched and written the
way Chakra emits them, kebab-case: `var(--chakra-colors-primary-fill-strong)`
→ `var(--chakra-colors-primary-hover)`, `var(--chakra-colors-primary-lighter)`
→ `var(--chakra-colors-primary-wash-active)` (never `…-washActive`, which
names no variable), `--chakra-colors-gray-dark-200` is a `grayDark` primitive. `gray.N` → `neutral.N`. `fg.accent` →
`primary.main`, except on the `color` attribute of a `<Link>` or `<a>`, where
it becomes `fg.link`.

## Reading the report

Each site appears as:

```
 REP src/foo.tsx [button-variants] L42 <Button> variant — dynamic (not migrated): variant={kind}
```

The `node index.js` runner adds a table at the end:

```
── logician-ui 5.0 codemod summary ──

Migrated automatically:
  button-variants · elements migrated          6
  tag-chip · Chip → Tag                        2
  token-renames · tokens renamed               4

Needs a human: 6 site(s)
  button-variants · dynamic                    1
  button-variants · spread                     1
  button-variants · todo                       1
  card-gradient · todo                         1
  tag-chip · selected                          1
  token-renames · primitive                    1

location        component  prop                  kind       source
--------------  ---------  --------------------  ---------  ------
src/a.tsx:8     LButton    colorPalette+variant  todo       <LButton colorPalette="secondary" variant="solid">   ← … → variant="primary"
src/a.tsx:9     LButton    variant               dynamic    variant={kind}   ← not migrated
src/a.tsx:10    LButton    {...spread}           spread     {...p}   ← may carry colorPalette/variant — check by hand
…
```

| kind        | meaning                                                                                                                                                                                         | what to do                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `dynamic`   | the prop is an expression (`variant={x}`, `colorPalette={a ? 'danger' : 'primary'}`). The element is **left exactly as it was**                                                                 | Map the values by hand using the tables above. This is the "동적 호출부" list |
| `spread`    | `{...props}` on the element may carry `colorPalette` or `variant`. The static props were still migrated                                                                                         | Check what the spread contains                                                |
| `todo`      | converted so it compiles, but no exact 5.0 equivalent exists. A `/* TODO(logician-ui 5.0): … */` comment is on the element                                                                      | Choose a role with a designer, then delete the comment                        |
| `selected`  | a solid Tag/Chip became `selected`, which also makes it interactive (hover border, pointer). The unmigrated tag only had the look                                                               | Keep it if the tag is a toggle; otherwise pick a tone or drop `selected`      |
| `primitive` | raw `blue.N`, `violet.N`, `rose.N`, `gold.N`, `green.N`, `grayDark.N`, `purple.N`, `red.N`, `yellow.N`. These are **not renamed**, because the right 5.0 name depends on what the colour is for | Choose `primary.*`, `neutral.N`, a status family or `category.*`              |
| `key`       | a deprecated token used as an object key or computed access (`{ 'slate.800': … }`, `colors['slate.800']`). Not renamed, because that would change what the key defines                          | Usually an app theme override. Delete it or rename it by hand                 |
| `reference` | `Chip` used outside JSX (`styled(Chip)`). Renamed to `Tag`, but props passed there were not migrated and Chip's pill shape is not added                                                         | Check the props; add the shape if needed                                      |
| `type`      | an import of `ChipProps` / `ChipVariant` / …                                                                                                                                                    | Switch to the `Tag*` types                                                    |

The runner also writes the raw report as JSON lines (path printed at the end)
so it can be filtered with `jq`.

## What it does not do

- It does not migrate dynamic values, spreads, or props passed through wrapper
  components (`<MyButton colorPalette="danger">` where MyButton forwards to
  Button). The report lists them.
- It does not rename raw primitives other than `gray.N`, hard-coded hex values
  (`#1F687E`), or tokens inside non-string code such as `colors.blue[500]` or
  string concatenation (`'slate.' + n`).
- It does not touch object keys, `.css`/`.scss` files or MDX. Run it on
  `.tsx,.ts` (and `.jsx,.js` if you have them).
- It does not treat `fg.accent` as a link outside a direct `color` attribute
  on `<Link>` or `<a>`. Inside `_hover={{ color: 'fg.accent' }}` on a Link, or
  on a component that renders a link, it becomes `primary.main`. Grep for
  `primary.main` near links afterwards.
- It does not format code. New attributes and TODO comments come out in
  jscodeshift's layout, so run Prettier afterwards.
- Under `index.js`, line numbers reported by later transforms refer to the
  file after earlier transforms ran. TODO comments can shift lines by one or
  two.
- It is not meant to run on logician-ui's own `src/`. The library imports its
  components by relative path, so only token renames would apply, and the
  stories that show deprecated names on purpose would be rewritten.

## Tests

```sh
npx vitest run --config codemods/vitest.config.ts
```

Fixtures are in `__testfixtures__/<transform>.input.tsx` / `.output.tsx`. For
`tag-chip`, the `tag-chip-*.input.tsx` variants cover import merging and name
conflicts. `index.*` runs every transform together. The test compares each
pair, checks that each output is a fixed point (idempotent), asserts the
report sites (dynamic, spread, todo, primitive, key, type, reference), checks
every alias in the token map, and runs the `node index.js` runner end to end
in `--dry` mode.
