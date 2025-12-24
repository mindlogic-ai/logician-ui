import { ForwardedRef, forwardRef } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import {
  IconButton,
  InputGroup,
  mergeRefs,
  useControllableState,
} from '@chakra-ui/react';

import { Input } from '../Input';
import { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = forwardRef(
  (
    {
      rootProps,
      defaultVisible = false,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      disabled,
      ...rest
    }: PasswordInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible,
      onChange: onVisibleChange,
    });

    const handleToggle = () => setVisible(!visible);

    return (
      <InputGroup
        endElement={
          <IconButton
            tabIndex={-1}
            me="-2"
            aspectRatio="square"
            size="sm"
            variant="ghost"
            height="calc(100% - {spacing.2})"
            aria-label="Toggle password visibility"
            onPointerDown={(e) => {
              if (disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              handleToggle();
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </IconButton>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          disabled={disabled}
          ref={mergeRefs(ref as any)}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
