/**
 * Doc-only token table for guideline pages: one row per semantic token, with
 * its light and dark value resolved from the shipped theme
 * (`getSwatchGroups` in `src/theme/paletteSwatches.ts`). No hex is written by
 * hand, so a palette change shows up here on the next build.
 *
 * Render it inside a story (it uses Chakra), then pull the story into MDX with
 * `<Canvas of={…} />` or `<Story of={…} />`. Not exported from the library.
 */
import type { ReactNode } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { readableColor } from 'polished';

import { getSwatchGroups, Swatch } from '../../theme/paletteSwatches';
import { T } from './Lang';

const SWATCHES: ReadonlyMap<string, Swatch> = new Map(
  getSwatchGroups().flatMap(([, swatches]) =>
    swatches.map((swatch) => [swatch.path, swatch] as const)
  )
);

/** Light and dark hex of a public semantic token. Throws on an unknown name. */
const resolveToken = (path: string): Swatch => {
  const swatch = SWATCHES.get(path);
  if (!swatch) throw new Error(`Unknown semantic colour token: ${path}`);
  return swatch;
};

/** Label colour for a chip: brand black or white, whichever reads on it. */
const labelOn = (hex: string) =>
  readableColor(hex, '#252525', '#FFFFFF', false);

const Chip = ({ hex }: { hex: string }) => {
  const transparent = !/^#/.test(hex);
  return (
    <Box
      // Literal values, not tokens: the chip shows one fixed mode's value
      // whatever mode the page is in.
      style={{
        background: transparent ? undefined : hex,
        color: transparent ? undefined : labelOn(hex),
      }}
      borderWidth="1px"
      borderColor="border.subtle"
      borderStyle={transparent ? 'dashed' : 'solid'}
      borderRadius="sm"
      px={2}
      py={1.5}
      fontFamily="mono"
      fontSize="11px"
      minW="88px"
    >
      {hex.replace('#', '')}
    </Box>
  );
};

type TokenRow = {
  /** Semantic token path, e.g. `primary.main`. */
  token: string;
  /** What the token is for, in the reader's language. */
  use?: ReactNode;
};

const HEADERS: ReactNode[] = [
  <T key="token" en="Token" ko="토큰" />,
  <T key="light" en="Light" ko="라이트" />,
  <T key="dark" en="Dark" ko="다크" />,
  <T key="use" en="Use" ko="쓰는 곳" />,
];

/**
 * Token | light | dark | use. Pass `rows` as token names or `{ token, use }`;
 * `use` is usually a `<T en ko />` so it follows the page language.
 */
export const TokenTable = ({ rows }: { rows: (string | TokenRow)[] }) => {
  const normalised = rows.map((row) =>
    typeof row === 'string' ? { token: row } : row
  );
  const hasUse = normalised.some((row) => row.use);
  return (
    <Grid
      templateColumns={{
        base: 'minmax(0,1fr) auto auto',
        md: hasUse
          ? 'minmax(160px,auto) auto auto minmax(0,1fr)'
          : 'minmax(160px,auto) auto auto',
      }}
      columnGap={3}
      rowGap={1.5}
      alignItems="center"
      justifyContent="start"
      fontSize="13px"
      color="fg.default"
      maxW="100%"
    >
      {HEADERS.slice(0, hasUse ? 4 : 3).map((header, i) => (
        <Box
          key={i}
          fontWeight="bold"
          color="fg.subtle"
          display={i === 3 ? { base: 'none', md: 'block' } : undefined}
        >
          {header}
        </Box>
      ))}
      {normalised.map(({ token, use }) => {
        const { light, dark } = resolveToken(token);
        return (
          <Box key={token} display="contents">
            <Box fontFamily="mono" fontSize="12px" wordBreak="break-all">
              {token}
              {use && (
                <Box
                  display={{ base: 'block', md: 'none' }}
                  fontFamily="body"
                  color="fg.subtle"
                >
                  {use}
                </Box>
              )}
            </Box>
            <Chip hex={light} />
            <Chip hex={dark} />
            {hasUse && (
              <Box display={{ base: 'none', md: 'block' }} color="fg.muted">
                {use}
              </Box>
            )}
          </Box>
        );
      })}
    </Grid>
  );
};
