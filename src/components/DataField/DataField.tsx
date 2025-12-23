import { useRef, useState } from 'react';
import {
  Box,
  Editable,
} from '@chakra-ui/react';

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
import { Tooltip } from '@/components/Tooltip';

import { Edit, FaRegCopy } from '../Icon';

const TOOLTIP_DISPLAY_TIME = 3000;

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
  const previewRef = useRef<HTMLDivElement>(null);
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

  const handleSubmit = (details: { value: string }) => {
    actIfAllowed(editableProps?.onSubmit, details.value);
  };

  const PreviewComponent = as ? as : (props: any) => <span {...props} />;

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
            onValueCommit={handleSubmit}
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
            <Editable.Control {...({ asChild: true } as any)}>
              <div>
                <IconButton
                  aria-label={`Edit ${label}`}
                  onClick={handleEditButtonClick}
                  colorScheme="neutral"
                  variant="ghost"
                >
                  <Edit boxSize="xs" />
                </IconButton>
                {isCopyable && (
                  <Tooltip label="Copied!" open={hasOpenCopyTooltip}>
                    <IconButton
                      aria-label={`Copy ${label}`}
                      onClick={handleCopyButtonClick}
                      colorScheme="neutral"
                      variant="ghost"
                    >
                      <FaRegCopy boxSize="xs" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </Editable.Control>
          </Editable.Root>
        ) : (
          <Box>
            {value}{' '}
            {isCopyable && (
              <Tooltip label="Copied!" open={hasOpenCopyTooltip}>
                <IconButton
                  aria-label={`Copy ${label}`}
                  onClick={handleCopyButtonClick}
                  colorScheme="neutral"
                  variant="ghost"
                >
                  <FaRegCopy boxSize="xs" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Text>
    </Box>
  );
};
