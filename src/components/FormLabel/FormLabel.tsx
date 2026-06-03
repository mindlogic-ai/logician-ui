import { Box, Field } from '@chakra-ui/react';

export const FormLabel = (props: Field.LabelProps) => (
  <Box color="fg.muted">
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
        Field.RequiredIndicator는 내부적으로 useFieldContext()를 호출하여
        부모 Field.Root(FormControl)의 required 상태를 React Context로 읽습니다.
        field.required가 falsy면 null을 반환하므로, props 없이도 조건부 렌더링됩니다.
        @see node_modules/@chakra-ui/react/dist/esm/components/field/field.js
      */}
      <Field.RequiredIndicator />
    </Field.Label>
  </Box>
);
