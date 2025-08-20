import { useState } from 'react';
import { Button, Flex, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { OptionStyles } from './SegmentedControl.styles';
import { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl = ({
  options,
  value,
  onSelect,
  borderRadius = 'md',
  size,
  ...rest
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(options[0].value);
  const theme = useTheme();

  // Use the controlled value if provided, otherwise use the internal state
  const activeValue = value !== undefined ? value : internalValue;
  const activeIndex = options.findIndex(option => option.value === activeValue);

  const getControlPadding: (
    size: SegmentedControlProps['size'],
  ) => SegmentedControlProps['padding'] = (size = 'md') => {
    const paddings = {
      xs: theme.space[1],
      sm: theme.space[1],
      md: theme.space[1],
      lg: {},
      xl: {},
    };
    return paddings[size];
  };

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
      // p="1"
      {...rest}
    >
      <motion.div
        initial={false}
        animate={{
          x: `calc(${100 * activeIndex}% + ${getControlPadding(size)})`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'absolute',
          top: getControlPadding(size),
          bottom: getControlPadding(size),
          left: `calc(${activeIndex * 2} * ${getControlPadding(size)})`,
          width: `calc(${100 / options.length}% - 2 * ${getControlPadding(size)})`,
          borderRadius: theme.radii[borderRadius],
          background: theme.colors.white,
          boxShadow: theme.shadows.md,
        }}
      />

      {options.map(option => (
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
