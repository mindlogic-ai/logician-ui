import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
  useTheme,
  useToken,
} from '@chakra-ui/react';

export const MenuList = ({ ...rest }: ChakraMenuListProps) => {
  const theme = useTheme();
  return (
    <ChakraMenuList
      border={`1px solid ${useToken('colors', theme.colors.gray[400])}`}
      borderRadius="md"
      boxShadow={`0 5px 20px 1px ${useToken('colors', theme.colors.gray[50])}`}
      padding={1.5}
      {...rest}
    />
  );
};
