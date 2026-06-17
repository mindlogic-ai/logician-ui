import { TableRowProps } from '../Table.types';

export interface ExpandingTrProps extends TableRowProps {
  children: React.ReactNode;
  isExpanded: boolean; // Controls whether the expanded content is visible
  expandedRowProps?: TableRowProps;
  expandedContent: React.ReactNode;
}
