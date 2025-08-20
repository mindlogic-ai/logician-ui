import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import { darken } from 'polished';

import { ColorPicker } from '..';
import { ColorPickerPopoverProps } from './ColorPickerPopover.types';

export const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = memo(
  ({ color: controlledColor, onChange, ...pickerProps }) => {
    const [uncontrolledColor, setUncontrolledColor] =
      useState<string>('#ffffff');
    const color = controlledColor ?? uncontrolledColor; // Use controlled or internal color state
    const { isOpen, onClose, onToggle } = useDisclosure();

    const handleColorChangeComplete = useCallback(
      debounce((colorResult: string) => {
        const newColor = colorResult;
        if (onChange) {
          // Controlled mode: call the provided onChange
          onChange(newColor);
        } else {
          // Uncontrolled mode: update internal state
          setUncontrolledColor(newColor);
        }
      }),
      [],
    );

    return (
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        isLazy
        lazyBehavior="keepMounted"
      >
        <PopoverTrigger>
          <Button
            borderRadius="full"
            p={4}
            onClick={onToggle}
            bgColor={color}
            _hover={{ opacity: 0.9 }}
            border="1px solid"
            borderColor={darken(0.1, color)}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content">
          <PopoverArrow />
          <PopoverBody p={0}>
            <ColorPicker
              color={color}
              onChange={handleColorChangeComplete}
              {...pickerProps}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  },
);

ColorPickerPopover.displayName = 'ColorPickerPopover';

export default ColorPickerPopover;
