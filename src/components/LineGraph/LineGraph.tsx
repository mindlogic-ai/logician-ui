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

import { DatumBase, LineGraphProps } from './LineGraph.types';
import { seriesColor } from './seriesColors';

export const LineGraph = <T extends DatumBase>({
  data = [],
  dataKeys,
  displayLegend = true,
  ...rest
}: LineGraphProps<T>) => {
  const primaryColor = useToken('colors', 'primary.main')[0];
  // Series 1 is the neutral brand line; further series cycle hues with no
  // status meaning (see seriesColors.ts). Strokes read the generated palette
  // directly because no semantic role fits a chart line.
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
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
              stroke={color ?? seriesColor(index, primaryColor, isDark)}
              dot={{ r: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
