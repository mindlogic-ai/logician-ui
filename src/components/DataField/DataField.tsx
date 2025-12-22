import { ReactNode, useRef, useState } from 'react';
import { Box, Editable, Tooltip } from '@chakra-ui/react';

import { AutowidthInput } from '@/components/AutowidthInput';
import {
  editablePreviewStyles,
  editableStyles,
  inputStyles,
  previewWrapperStyles,
} from '@/components/DataField/DataField.styles';
import { DataFieldProps } from '@/components/DataField/DataField.types';
import { IconButton } from '@/components/IconButton';
import { Text } from '@/components/Typography';

import { Edit, FaRegCopy } from '../Icon';

// Extended types for Chakra v3 compound components that need children
type TooltipTriggerProps = React.ComponentProps<typeof Tooltip.Trigger> & {
  children?: ReactNode;
};
type TooltipPositionerProps = React.ComponentProps<typeof Tooltip.Positioner> & {
  children?: ReactNode;
};
type TooltipContentProps = React.ComponentProps<typeof Tooltip.Content> & {
  children?: ReactNode;
};

const TOOLTIP_DISPLAY_TIME = 3000;

// Cast Tooltip components to extended types that include children
const TooltipTrigger = Tooltip.Trigger as React.FC<TooltipTriggerProps>;
const TooltipPositioner = Tooltip.Positioner as React.FC<TooltipPositionerProps>;
const TooltipContent = Tooltip.Content as React.FC<TooltipContentProps>;

export const DataField = ({
  label,
  value,
  inputProps: inputPropsProp, // only relevant if `isEditable`
  editableProps, // only relevant if `isEditable`
  editablePreviewProps, // only relevant if `isEditable`
  onChange,
  as,
  isCopyable = false,
  isEditable = false,
  allowEmpty = false,
}: DataFieldProps) => {
  const previewRef = useRef<HTMLSpanElement>(null);
  const [hasOpenCopyTooltip, setOpenCopyTooltip] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<string>(value);
  const { onBlur, ...inputProps } = inputPropsProp ?? {};

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(value);
    setOpenCopyTooltip(true);
    const timeout = setTimeout(() => {
      setOpenCopyTooltip(false);
      clearTimeout(timeout);
    }, TOOLTIP_DISPLAY_TIME);
  };

  const handleEditButtonClick = () => {
    previewRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const actIfAllowed = (
    fn: ((value: string) => void) | undefined,
    newValue: string
  ) => {
    if (!allowEmpty && newValue.length < 1) {
      // act with initial value if not allowed
      fn?.(initialValue);
    } else {
      // act with new value if allowed
      fn?.(newValue);
      setInitialValue(newValue);
    }
  };

  const handleValueChange = (details: { value: string }) => {
    actIfAllowed(editableProps?.onSubmit, details.value);
  };

  const PreviewComponent = as ? as : (props: any) => <span {...props} />;

  const CopyButton = () => (
    <Tooltip.Root open={hasOpenCopyTooltip}>
      <TooltipTrigger asChild>
        <IconButton
          aria-label={`Copy ${label}`}
          icon={<FaRegCopy color="gray.400" boxSize="sm" />}
          onClick={handleCopyButtonClick}
        />
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>Copied!</TooltipContent>
      </TooltipPositioner>
    </Tooltip.Root>
  );

  return (
    <Box>
      {/* TODO: replace with label component */}
      {label && (
        <Text fontWeight="bold" color="black">
          {label}
        </Text>
      )}
      <Text>
        {isEditable ? (
          <Editable.Root
            value={value}
            {...editableStyles}
            {...editableProps}
            onValueCommit={handleValueChange}
          >
            <PreviewComponent {...previewWrapperStyles}>
              <Editable.Preview
                {...editablePreviewStyles}
                {...editablePreviewProps}
                ref={previewRef}
              />
            </PreviewComponent>
            <AutowidthInput
              as={Editable.Input}
              value={value}
              {...inputStyles}
              {...inputProps}
              onChange={handleInputChange}
            />
            <IconButton
              aria-label={`Edit ${label}`}
              icon={<Edit color="gray.400" boxSize="sm" />}
              onClick={handleEditButtonClick}
            />
            {isCopyable && <CopyButton />}
          </Editable.Root>
        ) : (
          <Box>
            {value} {isCopyable && <CopyButton />}
          </Box>
        )}
      </Text>
    </Box>
  );
};
