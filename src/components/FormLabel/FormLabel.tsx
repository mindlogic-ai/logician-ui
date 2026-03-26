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
      {/*
        Field.RequiredIndicator는 props 없이 사용되지만,
        Chakra UI v3 Field context를 통해 부모 FormControl(Field.Root)의
        required 상태를 읽어 조건부로 렌더링됩니다.
        - FormControl에 required prop이 있으면 '*' 표시
        - required가 없으면 아무것도 렌더링하지 않음
      */}
      <Field.RequiredIndicator />
    </Field.Label>
  </Box>
);
