import { useRef, useState } from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Tooltip,
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

  const handleSubmit = (val: string) => {
    actIfAllowed(editableProps?.onSubmit, val);
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
          <Editable
            value={value}
            {...editableStyles}
            {...editableProps}
            onSubmit={handleSubmit}
          >
            <PreviewComponent {...previewWrapperStyles}>
              <EditablePreview
                {...editablePreviewStyles}
                {...editablePreviewProps}
                ref={previewRef}
              />
            </PreviewComponent>
            <AutowidthInput
              as={EditableInput}
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
            {isCopyable && (
              <Tooltip label="Copied!" isOpen={hasOpenCopyTooltip}>
                <IconButton
                  aria-label={`Copy ${label}`}
                  icon={<FaRegCopy color="gray.400" boxSize="sm" />}
                  onClick={handleCopyButtonClick}
                />
              </Tooltip>
            )}
          </Editable>
        ) : (
          <Box>
            {value}{' '}
            {isCopyable && (
              <Tooltip label="Copied!" isOpen={hasOpenCopyTooltip}>
                <IconButton
                  aria-label={`Copy ${label}`}
                  icon={<FaRegCopy color="gray.400" boxSize="sm" />}
                  onClick={handleCopyButtonClick}
                />
              </Tooltip>
            )}
          </Box>
        )}
      </Text>
    </Box>
  );
};
