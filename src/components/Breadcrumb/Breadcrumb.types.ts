import { ReactNode } from 'react';
import {
  BreadcrumbRootProps as ChakraBreadcrumbRootProps,
  SystemStyleObject,
} from '@chakra-ui/react';

export interface BreadcrumbProps extends ChakraBreadcrumbRootProps {
  /** Custom separator to display between breadcrumb items */
  separator?: ReactNode;
  /** Gap between breadcrumb items and separators */
  separatorGap?: SystemStyleObject['gap'];
}
