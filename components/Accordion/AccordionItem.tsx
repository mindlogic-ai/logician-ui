import { AccordionItem as ChakraAccordionItem } from '@chakra-ui/react';

export const AccordionItem = ({ _first = {}, _last = {}, ...rest }) => {
  return (
    <ChakraAccordionItem
      _first={{
        borderTopWidth: 0,
        ..._first,
      }}
      _last={{
        borderBottomWidth: 0,
        ..._last,
      }}
      {...rest}
    />
  );
};
