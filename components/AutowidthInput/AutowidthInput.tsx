import { useEffect, useRef, useState } from 'react';
import { Box, Input, InputProps } from '@chakra-ui/react';

export const AutowidthInput = ({
  value,
  placeholder,
  style = {},
  widthMeasureProps,
  ...rest
}: InputProps & { widthMeasureProps?: any }) => {
  const valueWidthMeasureRef = useRef(null);
  const [inputWidth, setInputWidth] = useState<number>();

  useEffect(() => {
    if (valueWidthMeasureRef.current)
      setInputWidth(valueWidthMeasureRef.current.offsetWidth);
  }, [value, style]);

  return (
    <Box>
      <span
        ref={valueWidthMeasureRef}
        {...widthMeasureProps}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 'fit-content',
          display: 'inline-flex',
          ...widthMeasureProps?.style,
        }}
      >
        {value || placeholder}
      </span>
      <Input
        value={value}
        placeholder={placeholder}
        {...rest}
        style={{
          width: inputWidth,
          boxSizing: 'content-box',
          ...style,
        }}
      />
    </Box>
  );
};
