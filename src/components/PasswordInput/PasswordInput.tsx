import { ForwardedRef, forwardRef, useState } from 'react';

import { FaRegEye, FaRegEyeSlash } from '../Icon';
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = forwardRef(
  (
    { wrapperProps, rightElementProps, ...rest }: PasswordInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => setShow(!show);

    return (
      <Input
        ref={ref}
        wrapperProps={{ ...wrapperProps }}
        trimWhiteSpace
        {...rest}
        type={show ? 'text' : 'password'}
        rightIcon={
          <IconButton
            colorScheme="neutral"
            variant="ghost"
            _hover={{
              bgColor: 'whiteAlpha.400',
            }}
            _active={{
              bgColor: 'whiteAlpha.400',
            }}
            icon={
              show ? (
                <FaRegEye fill="gray.900" boxSize="xs" />
              ) : (
                <FaRegEyeSlash fill="gray.900" boxSize="xs" />
              )
            }
            onClick={handleClick}
            aria-label="Toggle password visibility"
          />
        }
        rightElementProps={{ ...rightElementProps }}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
