import { ComponentProps, ReactNode } from 'react';
import {
  Breadcrumb as ChakraBreadcrumb,
  SystemStyleObject,
} from '@chakra-ui/react';

export interface BreadcrumbProps extends ComponentProps<
  typeof ChakraBreadcrumb.Root
> {
  /** Custom separator to display between breadcrumb items */
  separator?: ReactNode;
  /** Gap between breadcrumb items and separators */
  separatorGap?: SystemStyleObject['gap'];
}
