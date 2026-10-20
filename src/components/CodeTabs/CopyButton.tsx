import { useState } from 'react';

import { useTranslate } from '@/hooks/useTranslate';

import { FaRegCopy } from '../Icon';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { CODE_CHROME } from './CodeTabs.styles';

export interface CopyButtonProps {
  onCopy: (code: string) => void;
  code: string;
}

export const CopyButton = ({ onCopy, code }: CopyButtonProps) => {
  const translate = useTranslate();
  const [tooltipText, setTooltipText] = useState(translate('copy'));
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean | undefined>(
    undefined
  );

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    onCopy(code);

    setTooltipText(translate('copied'));
    setIsTooltipOpen(true);

    setTimeout(() => {
      setTooltipText(translate('copy'));
      setIsTooltipOpen(undefined);
    }, 1500);
  };

  return (
    <Tooltip content={tooltipText} placement="top" open={isTooltipOpen}>
      <IconButton
        aria-label="Copy"
        borderRadius="full"
        size="sm"
        variant="ghost"
        color={CODE_CHROME.fgMuted}
        _hover={{
          bgColor: CODE_CHROME.bgHover,
          color: CODE_CHROME.fg,
        }}
        _active={{
          bgColor: CODE_CHROME.bgActive,
          color: CODE_CHROME.fg,
        }}
        onClick={handleCopyClick}
      >
        <FaRegCopy boxSize="xs" />
      </IconButton>
    </Tooltip>
  );
};
