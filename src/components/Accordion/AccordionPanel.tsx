import {
  Accordion,
  AccordionItemContentProps as ChakraAccordionItemContentProps,
} from '@chakra-ui/react';

export type AccordionPanelProps = ChakraAccordionItemContentProps;

/**
 * @deprecated This component doesn't exist in Chakra UI v3. Use `Accordion.ItemContent` and `Accordion.ItemBody` directly instead.
 * This component will be removed in the next major version.
 *
 * @example
 * ```tsx
 * // Before
 * <AccordionPanel>Content here</AccordionPanel>
 *
 * // After (Chakra v3)
 * <Accordion.ItemContent>
 *   <Accordion.ItemBody>Content here</Accordion.ItemBody>
 * </Accordion.ItemContent>
 * ```
 */
export const AccordionPanel = ({ children, ...rest }: AccordionPanelProps) => {
  return (
    <Accordion.ItemContent {...rest}>
      <Accordion.ItemBody>{children}</Accordion.ItemBody>
    </Accordion.ItemContent>
  );
};
