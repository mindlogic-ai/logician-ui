import { Progress as ChakraProgress } from '@chakra-ui/react';

import { sizeStyles } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({
  filledTrackColor,
  value,
  size = 'md',
  ...rest
}: ProgressBarProps) => {
  const styles = sizeStyles[size];

  return (
    <ChakraProgress.Root
      value={value}
      {...styles}
      {...rest}
    >
      <ChakraProgress.Track {...({ asChild: true } as any)}>
        <div style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
          <ChakraProgress.Range {...({ asChild: true } as any)}>
            <div style={{
              backgroundColor: filledTrackColor ?? 'var(--chakra-colors-primary-main)',
              transition: 'width 0.3s ease-in-out'
            }} />
          </ChakraProgress.Range>
        </div>
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  );
};

ProgressBar.displayName = 'ProgressBar';
