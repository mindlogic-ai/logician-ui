import { BoxProps } from '@chakra-ui/react';
import { type DataKey as RechartsDataKey } from 'recharts/types/util/types.d';

export interface LineGraphProps<T extends DatumBase> extends BoxProps {
  /** One object per point on the X axis; `name` is the axis label. */
  data: Array<Datum<T>>;
  /** The series to draw, in order. */
  dataKeys: Array<DataKey<T>>;
  /**
   * Show the legend under the chart.
   * @default true
   */
  displayLegend?: boolean;
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
   * Series name, shown in the legend and the tooltip.
   */
  label: string;

  /**
   * Stroke colour for this series, passed straight to the SVG (recharts does
   * not resolve Chakra tokens — use a CSS variable such as
   * `var(--chakra-colors-category-teal-fg)`). Defaults: series 1 is
   * `primary.main`, the rest cycle meaning-free category hues
   * (`CHART_SERIES_HUES`).
   */
  color?: string;
};
