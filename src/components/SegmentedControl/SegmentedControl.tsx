import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { OptionStyles } from './SegmentedControl.styles';
import { SegmentedControlProps } from './SegmentedControl.types';

// Padding values for different sizes
const controlPaddings = {
  xs: 'var(--chakra-spacing-1)',
  sm: 'var(--chakra-spacing-1)',
  md: 'var(--chakra-spacing-1)',
  lg: 'var(--chakra-spacing-2)',
  xl: 'var(--chakra-spacing-2)',
};

// Border radius map
const radiiMap: Record<string, string> = {
  none: '0',
  sm: 'var(--chakra-radii-sm)',
  base: 'var(--chakra-radii-base)',
  md: 'var(--chakra-radii-md)',
  lg: 'var(--chakra-radii-lg)',
  xl: 'var(--chakra-radii-xl)',
  full: 'var(--chakra-radii-full)',
};

export const SegmentedControl = ({
  options,
  value,
  onSelect,
  borderRadius = 'md',
  size = 'md',
  ...rest
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(options[0].value);

  // Use the controlled value if provided, otherwise use the internal state
  const activeValue = value !== undefined ? value : internalValue;
  const activeIndex = options.findIndex(
    (option) => option.value === activeValue
  );

  const controlPadding = controlPaddings[size] || controlPaddings.md;

  const handleSelect = (selectedValue: string) => {
    if (value === undefined) {
      setInternalValue(selectedValue);
    }
    if (onSelect) onSelect(selectedValue);
  };

  return (
    <Flex
      position="relative"
      borderRadius={borderRadius}
      bg="gray.50"
      {...rest}
    >
      <motion.div
        initial={false}
        animate={{
          x: `calc(${100 * activeIndex}% + ${controlPadding})`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'absolute',
          top: controlPadding,
          bottom: controlPadding,
          left: `calc(${activeIndex * 2} * ${controlPadding})`,
          width: `calc(${100 / options.length}% - 2 * ${controlPadding})`,
          borderRadius: radiiMap[borderRadius] || radiiMap.md,
          background: 'white',
          boxShadow: 'var(--chakra-shadows-md)',
        }}
      />

      {options.map((option) => (
        <Button
          key={option.value}
          flex={1}
          variant="ghost"
          color={activeValue === option.value ? 'gray.1200' : 'gray.600'}
          onClick={() => handleSelect(option.value)}
          _hover={{ bg: 'transparent' }}
          fontSize={size}
          {...OptionStyles[size ?? 'md']}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  );
};
