import { Box, Field } from '@chakra-ui/react';

export const FormLabel = (props: Field.LabelProps) => (
  <Box color="gray.1000">
    <Field.Label
      {...props}
      style={{
        marginBottom: '0.125rem',
        marginInlineEnd: 0,
        ...(props.style || {}),
      }}
    >
      {props.children}
      {/* 부모 FormControl(Field.Root)에 required prop이 있을 때만 필수 표시(*) 렌더링 */}
      <Field.RequiredIndicator />
    </Field.Label>
  </Box>
);
