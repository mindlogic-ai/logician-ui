import { ForwardedRef, forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Icon } from '../Icon';
import { Text } from '../Typography';
import {
  accentStyles,
  bannerStyles,
  iconStyles,
  sizeStyles,
  textStyles,
} from './Banner.styles';
import { BannerProps } from './Banner.types';

export const Banner = forwardRef(
  (
    {
      children,
      variant = 'info',
      hideIcon = false,
      size = 'md',
      ...rest
    }: BannerProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const styles = sizeStyles[size];
    return (
      <Box
        position="relative"
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        my={2}
        border="1px solid"
        textAlign="left"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-2px',
          bottom: '-1px',
          width: styles.accentWidth,
          borderTopLeftRadius: 'lg',
          borderBottomLeftRadius: 'lg',
          ...accentStyles[variant],
        }}
        {...styles.container}
        {...bannerStyles[variant]}
        ref={ref}
        {...rest}
      >
        <Flex align="stretch" gap={2}>
          {!hideIcon && (
            <Box>
              {/* @ts-expect-error - Icon ref type incompatibility */}
              <Icon mr={2} {...styles.icon} {...iconStyles[variant]} />
            </Box>
          )}
          {typeof children === 'string' ? (
            <Text w="100%" {...styles.text} {...textStyles[variant]}>
              {children}
            </Text>
          ) : (
            <Flex
              w="100%"
              flexDir="column"
              justify="center"
              {...styles.text}
              {...textStyles[variant]}
            >
              {children}
            </Flex>
          )}
        </Flex>
      </Box>
    );
  }
);

Banner.displayName = 'Banner';
