import { MenuItem as ChakraMenuItem, useTheme } from '@chakra-ui/react';

import { ItemVariant, MenuItemProps } from './MenuItem.types';

export const MenuItem = ({
  variant = ItemVariant.Default,
  children,
  ...rest
}: MenuItemProps) => {
  const theme = useTheme();
  const isDangerVariant = variant === ItemVariant.Danger;

  return (
    <ChakraMenuItem
      color={
        isDangerVariant ? theme.semanticTokens.colors.danger.main : 'gray.800'
      }
      iconSpacing={0}
      fontSize="md"
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      _hover={{
        color: isDangerVariant
          ? theme.semanticTokens.colors.danger.main
          : 'gray.1200',
        backgroundColor: 'gray.50',
      }}
      {...rest}
    >
      {children}
    </ChakraMenuItem>
  );
};
