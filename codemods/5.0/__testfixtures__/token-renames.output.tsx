import { Box, Link, Text } from '@mindlogic-ai/logician-ui';
import NextLink from 'next/link';

type Tokens = 'slate.800' | 'primary.light';

const styles = {
  bg: 'primary.wash',
  hover: 'primary.wash',
  pressed: 'primary.washActive',
  border: 'border.strong',
  title: 'fg.default',
  fill: 'primary.main',
  fillStrong: 'primary.hover',
  secondaryText: 'secondary.fg',
  danger: 'danger.solid',
  successBg: 'success.bg',
  warn: 'warning.solid',
  selected: 'primary.selected',
  shadow: '0 0 0 1px var(--chakra-colors-neutral-5)',
  gradient:
    'linear-gradient(90deg, var(--chakra-colors-primary-wash), var(--chakra-colors-danger-solid))',
  gray: 'neutral.5',
  grayVar: 'var(--chakra-colors-neutral-9)',
  // Longest token wins: primary.lighter (not primary.light + "er"), slate.1000 (not slate.100 + "0")
  lighterNotLight: 'primary.washActive',
  slate1000: 'neutral.10',
  // Boundaries — must NOT change
  digitSuffix: 'slate.8000',
  wordSuffix: 'primary.light2',
  dashSuffix: 'primary.light-x',
  wordPrefix: 'xslate.800',
  dashPrefix: 'my-primary.light',
  varSuffix: 'var(--chakra-colors-slate-3000)',
  notAToken: 'fg.default',
  pathy: 'colors.primary.light',
  longer: 'slate.100x',
  // Raw primitives — reported, not renamed
  blue: 'blue.500',
  violet: 'violet.300',
  greenVar: 'var(--chakra-colors-green-600)',
  grayDark: 'grayDark.200',
};

const theme = { colors: { 'slate.800': '#616B85' } };

export const Tokens = ({ active }: { active: boolean }) => (
  <Box
    bg="neutral.2"
    color={'neutral.9'}
    borderColor={active ? 'primary.main' : 'neutral.5'}
    _hover={{ bg: 'primary.wash', color: 'primary.main' }}
    css={{ outline: `2px solid var(--chakra-colors-neutral-7)` }}
    sx={{
      border: `1px solid ${active ? 'red' : 'blue'}`,
      color: `slate.${1200}`,
    }}
  >
    <Text color="primary.main">accent text → primary.main</Text>
    <Link color="fg.link" href="/a">
      link → fg.link
    </Link>
    <a color="fg.link" href="/b">
      anchor → fg.link
    </a>
    <NextLink href="/c" color="primary.main">
      other Link-named? no — NextLink is not Link/a
    </NextLink>
    <Text color="neutral.10" bg={`neutral.1`}>
      {theme.colors['slate.800']}
    </Text>
  </Box>
);

export type { Tokens as T };
