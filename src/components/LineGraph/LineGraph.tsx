import { Box, useToken } from '@chakra-ui/react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useColorMode } from '@/components/ColorMode';
import { SYSTEM_HUE_NAMES } from '@/theme/colors';
import { SYSTEM_HUES } from '@/theme/palette.generated';

import { DatumBase, LineGraphProps } from './LineGraph.types';

export const LineGraph = <T extends DatumBase>({
  data = [],
  dataKeys,
  displayLegend = true,
  ...rest
}: LineGraphProps<T>) => {
  const primaryColor = useToken('colors', 'primary.main')[0];
  // A single series reads as the brand line (`primary.main`, a real semantic
  // token). Two or more need to be *distinguishable* from each other, which a
  // single flat colour can't do — so they cycle the 12 system hues instead.
  // `category.{hue}.surface/.fg` are the only hue roles exposed as CSS vars,
  // and both are tuned for a soft badge fill or its on-fill text, not a
  // chart stroke that has to read against a plain canvas. `base`/`baseDark`
  // in the raw generated palette are the vivid mid-tones that job wants, so —
  // per the chart-colour exception (no semantic role fits; see
  // `useColorModeValue`'s own doc comment) — this reads them directly rather
  // than inventing a `category.*.chart` role for one consumer.
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const categorySeriesColor = (index: number) => {
    const hue = SYSTEM_HUE_NAMES[index % SYSTEM_HUE_NAMES.length];
    return isDark ? SYSTEM_HUES[hue].baseDark : SYSTEM_HUES[hue].base;
  };
  const isMultiSeries = dataKeys.length > 1;
  return (
    <Box h="400px" {...rest}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 48,
          }}
        >
          <CartesianGrid
            // No dashes
            strokeDasharray=""
            vertical={false}
            // recharts passes this straight to SVG and never resolves Chakra
            // tokens, so use the CSS var directly — it flips with the .dark class.
            stroke="var(--chakra-colors-border-default)"
          />
          <XAxis
            dataKey="name"
            // Color of line
            stroke="transparent"
            // Props of text. CSS var (not a Chakra token) so the axis labels
            // flip with the mode — recharts won't resolve 'fg.muted' itself.
            tick={{
              fill: 'var(--chakra-colors-fg-muted)',
              fontSize: `${useToken('fontSizes', 'sm')}`,
            }}
            tickMargin={8}
          />
          <YAxis
            // Color of line
            stroke="transparent"
            // CSS var (see XAxis) so the labels flip with the mode.
            tick={{
              fill: 'var(--chakra-colors-fg-muted)',
              fontSize: `${useToken('fontSizes', 'sm')}`,
            }}
            tickMargin={0}
          />
          <Tooltip
            // recharts' default tooltip box is an unstyled white div, which is
            // why the label used to need a raw fixed-dark colour regardless of
            // mode. Themeing the box itself with CSS vars (so it flips too)
            // removes that special case — label and surface move together,
            // same as every other themed surface. CSS vars because recharts
            // won't resolve Chakra tokens (see XAxis/YAxis above).
            contentStyle={{
              backgroundColor: 'var(--chakra-colors-bg-surface)',
              borderColor: 'var(--chakra-colors-border-default)',
            }}
            labelStyle={{
              color: 'var(--chakra-colors-fg-default)',
            }}
            itemStyle={{
              color: 'var(--chakra-colors-fg-default)',
            }}
          />
          {displayLegend && (
            <Legend
              wrapperStyle={{
                bottom: -16,
              }}
            />
          )}
          {dataKeys.map(({ key, label, color }, index) => (
            <Line
              key={`line-${key}`}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={
                color ??
                (isMultiSeries ? categorySeriesColor(index) : primaryColor)
              }
              dot={{ r: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
