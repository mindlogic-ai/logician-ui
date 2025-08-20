import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Icon } from '../Icon';
import { Text } from '../Typography';
import { variantBoxStyles, variantLabelStyles } from './InfoBlock.styles';
import { InfoBlockProps } from './InfoBlock.types';

/**
 * `InfoBlock` is a component displayed when the user hovers over an InfoSprinkle.
 * It provides contextual information or warnings to enhance user experience.
 *
 * @param {string} props.label - The label text displayed in the InfoBlock.
 * @param {'default' | 'danger'} [props.variant='default'] - The style variant of the InfoBlock.
 *    - `default`: Standard style for informational messages.
 *    - `danger`: Style for warnings or critical messages. Includes a warning icon.
 * @param {React.ReactNode} props.children - The content or description displayed in the InfoBlock.
 * @param {object} [props.rest] - Additional properties passed to the root `Box` component.
 */
export const InfoBlock = ({
  label,
  variant = 'default',
  children,
  ...rest
}: InfoBlockProps) => {
  return (
    <Box {...variantBoxStyles[variant]} {...rest}>
      {label && (
        <Flex mb={2} gap={1} align="center">
          {variant === 'danger' && (
            <Icon icon="IoWarning" color={variantLabelStyles['danger'].color} />
          )}
          <Text {...variantLabelStyles[variant]}>{label}</Text>
        </Flex>
      )}
      <Box color="gray.1000" fontSize="subtitle" {...rest}>
        {children}
      </Box>
    </Box>
  );
};
