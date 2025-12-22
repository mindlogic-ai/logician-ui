import { Breadcrumb } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ChakraBreadcrumbLinkProps = React.ComponentProps<typeof Breadcrumb.Link>;

export interface BreadcrumbLinkProps extends ChakraBreadcrumbLinkProps {
  children?: ReactNode;
  href?: string;
}
