import { MouseEventHandler, useState } from 'react';

import { FaRegCopy } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { IconButtonProps } from '@/components/IconButton/IconButton.types';
import { Tooltip } from '@/components/Tooltip';
import { useTranslate } from '@/hooks/useTranslate';

export const CopyButton = ({
  onClick,
  ...rest
}: Omit<IconButtonProps, 'aria-label'>) => {
  const translate = useTranslate();
  const [labelText, setLabelText] = useState<string>(
    translate('copy') as string
  );

  //   Allow both boolean and undefined to toggle back and forth between controlled and uncontrolled states fluidly
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );

  const handleClick: MouseEventHandler = (e) => {
    // Set it to 'Copied'
    setLabelText(translate('copied') as string);
    // @ts-expect-error - Event type mismatch between generic and specific button events
    onClick?.(e);
    setIsTooltipOpen(true);
    // Set it back to 'Copy' after 2s, and back to an uncontrolled tooltip
    const t = setTimeout(() => {
      setLabelText(translate('copy') as string);
      setIsTooltipOpen(undefined);
      clearTimeout(t);
    }, 3000);
  };

  return (
    <Tooltip label={labelText} isOpen={isTooltipOpen} placement="top">
      <IconButton
        aria-label="Copy code"
        icon={<FaRegCopy boxSize="sm" />}
        onClick={handleClick}
        p={0}
        {...rest}
      />
    </Tooltip>
  );
};
