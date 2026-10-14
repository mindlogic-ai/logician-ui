import { Flex } from '@chakra-ui/react';

import { FormFooterProps } from './FormFooter.types';

/**
 * The sticky footer shell shared by the form-in-sidebar surfaces — the studio
 * settings footer and the image/video generation footers. It standardizes the
 * chrome (sticky bottom, `bg.surface`, hairline top border) and lays out an
 * optional left `start` slot against a right group of `meta` + `action`. The
 * action's own loading/disabled state lives on the button passed in, so this is
 * a pure layout shell.
 */
export const FormFooter = ({
  start,
  meta,
  action,
  sticky = true,
  ...rest
}: FormFooterProps) => {
  return (
    <Flex
      {...(sticky ? { position: 'sticky', bottom: 0 } : { flexShrink: 0 })}
      p={4}
      borderTopWidth="1px"
      borderColor="border.subtle"
      w="100%"
      bgColor="bg.surface"
      justify={start ? 'space-between' : 'flex-end'}
      align="center"
      {...rest}
    >
      {start}
      {(meta != null || action != null) && (
        <Flex
          align="center"
          justify="flex-end"
          gap={4}
          flex={start ? undefined : 1}
        >
          {meta}
          {action}
        </Flex>
      )}
    </Flex>
  );
};
