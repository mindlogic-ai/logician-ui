import { ForwardedRef, forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Text } from '../Typography';
import {
  accentStyles,
  bannerStyles,
  iconConfig,
  textStyles,
} from './Banner.styles';
import { BannerProps } from './Banner.types';

export const Banner = forwardRef(
  (
    { children, variant = 'info', hideIcon = false, ...rest }: BannerProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const { Icon, color } = iconConfig[variant];
    return (
      <Box
        position="relative"
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        borderTopLeftRadius="4px"
        borderBottomLeftRadius="4px"
        px={4}
        py={2}
        my={2}
        border="1px solid"
        textAlign="left"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-2px',
          bottom: '-1px',
          width: '4px',
          borderTopLeftRadius: 'lg',
          borderBottomLeftRadius: 'lg',
          ...accentStyles[variant],
        }}
        {...bannerStyles[variant]}
        ref={ref}
        {...rest}
      >
        <Flex align="stretch" gap={2}>
          {!hideIcon && (
            <Box>
              <Icon mr={2} color={color} boxSize="md" />
            </Box>
          )}
          {typeof children === 'string' ? (
            <Text w="100%" {...textStyles[variant]}>
              {children}
            </Text>
          ) : (
            <Box w="100%" {...textStyles[variant]}>
              {children}
            </Box>
          )}
        </Flex>
      </Box>
    );
  }
);

Banner.displayName = 'Banner';
