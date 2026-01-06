import {
  Accordion as ChakraAccordion,
  AccordionRootProps as ChakraAccordionRootProps,
} from '@chakra-ui/react';

export type AccordionProps = ChakraAccordionRootProps & {
  /**
   * @deprecated Use `collapsible` instead. Will be removed in next major version.
   */
  allowToggle?: boolean;
  /**
   * @deprecated Use `multiple` instead. Will be removed in next major version.
   */
  allowMultiple?: boolean;
};

export const Accordion = ({
  allowToggle, // v2 prop (deprecated)
  allowMultiple, // v2 prop (deprecated)
  collapsible,
  multiple,
  variant = 'enclosed', // Default to enclosed variant for v3
  ...rest
}: AccordionProps) => {
  // Support both v2 and v3 props for backward compatibility
  const isCollapsible = collapsible ?? allowToggle;
  const isMultiple = multiple ?? allowMultiple ?? true; // Default to multiple

  return (
    <ChakraAccordion.Root
      collapsible={isCollapsible}
      multiple={isMultiple}
      variant={variant}
      {...rest}
    />
  );
};
