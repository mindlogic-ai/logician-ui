import type { Theme } from '../theme/index';

declare module '@chakra-ui/react' {
  export function useTheme(): Theme;
}
