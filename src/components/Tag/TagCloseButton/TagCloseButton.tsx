import { ForwardedRef, forwardRef } from 'react';
import { Tag } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { TagCloseButtonProps } from './TagCloseButton.types';

/**
 * The remove (×) trigger inside a `Tag`. Inherits the tag's text colour and
 * sits at reduced opacity until hovered, so the label stays the loudest thing
 * in the tag.
 */
export const TagCloseButton = forwardRef(
  ({ ...rest }: TagCloseButtonProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Tag.EndElement>
        <Tag.CloseTrigger
          cursor="pointer"
          color="currentColor"
          opacity={0.6}
          transitionProperty="opacity"
          transitionDuration="fast"
          transitionTimingFunction="standard"
          _hover={{ opacity: 1 }}
          {...focusRing}
          {...rest}
          ref={ref}
        />
      </Tag.EndElement>
    );
  }
);

TagCloseButton.displayName = 'TagCloseButton';
