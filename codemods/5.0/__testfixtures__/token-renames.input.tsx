import { Box, Link, Text } from '@mindlogic-ai/logician-ui';
import NextLink from 'next/link';

type Tokens = 'slate.800' | 'primary.light';

const styles = {
  bg: 'primary.lightest',
  hover: 'primary.extralight',
  pressed: 'primary.lighter',
  border: 'primary.light',
  title: 'primary.dark',
  fill: 'primary.fill',
  fillStrong: 'primary.fillStrong',
  secondaryText: 'secondary.main',
  danger: 'danger.main',
  successBg: 'success.lightest',
  warn: 'warning.fill',
  selected: 'bg.selected',
  shadow: '0 0 0 1px var(--chakra-colors-slate-300)',
  gradient:
    'linear-gradient(90deg, var(--chakra-colors-primary-lightest), var(--chakra-colors-danger-main))',
  gray: 'gray.300',
  grayVar: 'var(--chakra-colors-gray-800)',
  // CSS variables are kebab-case (Chakra dash-cases camelCase segments)
  pressedVar: 'var(--chakra-colors-primary-lighter)',
  fillStrongVar: 'var(--chakra-colors-primary-fill-strong)',
  // Chakra token references with the `colors.` prefix
  pathy: 'colors.primary.light',
  ref: '{colors.success.main}',
  mix: 'color-mix(in oklab, {colors.warning.fill} 70%, black)',
  grayRef: '{colors.gray.300}',
  // Longest token wins: primary.lighter (not primary.light + "er"), slate.1000 (not slate.100 + "0")
  lighterNotLight: 'primary.lighter',
  slate1000: 'slate.1000',
  // Boundaries — must NOT change
  digitSuffix: 'slate.8000',
  wordSuffix: 'primary.light2',
  dashSuffix: 'primary.light-x',
  wordPrefix: 'xslate.800',
  dashPrefix: 'my-primary.light',
  varSuffix: 'var(--chakra-colors-slate-3000)',
  notAToken: 'fg.default',
  notColorsPrefix: 'foo.primary.light',
  deepPath: 'theme.colors.primary.light',
  longer: 'slate.100x',
  // Raw primitives — reported, not renamed
  blue: 'blue.500',
  violet: 'violet.300',
  greenVar: 'var(--chakra-colors-green-600)',
  grayDark: 'grayDark.200',
  grayDarkRef: '{colors.grayDark.200}',
  grayDarkVar: 'var(--chakra-colors-gray-dark-200)',
};

const token = (path: string) => path;
export const dangerRef = token('colors.danger.main');

const theme = { colors: { 'slate.800': '#616B85' } };

export const Tokens = ({ active }: { active: boolean }) => (
  <Box
    bg="slate.100"
    color={'slate.800'}
    borderColor={active ? 'primary.main' : 'slate.300'}
    _hover={{ bg: 'primary.lightest', color: 'fg.accent' }}
    css={{ outline: `2px solid var(--chakra-colors-slate-500)` }}
    sx={{
      border: `1px solid ${active ? 'red' : 'blue'}`,
      color: `slate.${1200}`,
    }}
  >
    <Text color="fg.accent">accent text → primary.main</Text>
    <Link color="fg.accent" href="/a">
      link → fg.link
    </Link>
    <a color="fg.accent" href="/b">
      anchor → fg.link
    </a>
    <NextLink href="/c" color="fg.accent">
      other Link-named? no — NextLink is not Link/a
    </NextLink>
    <Text color="slate.1000" bg={`slate.50`}>
      {theme.colors['slate.800']}
    </Text>
  </Box>
);

export type { Tokens as T };
