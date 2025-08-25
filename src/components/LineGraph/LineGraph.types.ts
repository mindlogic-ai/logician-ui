import { BoxProps } from '@chakra-ui/react';
import { type DataKey as RechartsDataKey } from 'recharts/types/util/types.d';

export interface LineGraphProps<T extends DatumBase> extends BoxProps {
  data: Array<Datum<T>>;
  dataKeys: Array<DataKey<T>>;
  isLegend?: boolean;
}

/**
 * Any numerical data the user wants to define
 */
export type DatumBase = {
  [key: string]: number | undefined;
};

/**
 * A name prop has to be passed to have the XAxis key always defined
 */
export type Datum<T extends DatumBase> = {
  name: string;
} & T;

/**
 * The data for each series
 */
export type DataKey<T extends DatumBase> = {
  /**
   * Key used to reference a value in the data prop
   */
  key: RechartsDataKey<keyof T>;

  /**
   * Label for the XAxis
   */
  label: string;

  /**
   * Optional custom colors for the series
   */
  color?: string;
};
