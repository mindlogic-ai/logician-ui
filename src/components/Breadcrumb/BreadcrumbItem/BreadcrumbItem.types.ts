import { Breadcrumb } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ChakraBreadcrumbItemProps = React.ComponentProps<typeof Breadcrumb.Item>;

export interface BreadcrumbItemProps extends ChakraBreadcrumbItemProps {
  children?: ReactNode;
}
