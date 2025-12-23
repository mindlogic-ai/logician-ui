import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { OptionStyles } from './SegmentedControl.styles';
import { SegmentedControlProps } from './SegmentedControl.types';

const RADII: Record<string, string> = {
  none: '0',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '32px',
  full: '9999px',
};

export const SegmentedControl = ({
  options,
  value,
  onSelect,
  borderRadius = 'md',
  size,
  ...rest
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(options[0].value);

  // Use the controlled value if provided, otherwise use the internal state
  const activeValue = value !== undefined ? value : internalValue;
  const activeIndex = options.findIndex(
    (option) => option.value === activeValue
  );

  const getControlPadding: (
    size: SegmentedControlProps['size']
  ) => SegmentedControlProps['padding'] = (size = 'md') => {
    const paddings = {
      xs: '4px',
      sm: '4px',
      md: '4px',
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
          // @ts-expect-error - Chakra UI responsive values in Framer Motion styles
          top: getControlPadding(size),
          // @ts-expect-error - Chakra UI responsive values in Framer Motion styles
          bottom: getControlPadding(size),
          left: `calc(${activeIndex * 2} * ${getControlPadding(size)})`,
          width: `calc(${100 / options.length}% - 2 * ${getControlPadding(size)})`,
          borderRadius: RADII[borderRadius] || '8px',
          background: 'white',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        }}
      />

      {options.map((option) => (
        <Button
          key={option.value}
          flex={1}
          variant={"ghost" as any}
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
