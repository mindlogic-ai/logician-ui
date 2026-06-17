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

import { DatumBase, LineGraphProps } from './LineGraph.types';

export const LineGraph = <T extends DatumBase>({
  data = [],
  dataKeys,
  displayLegend = true,
  ...rest
}: LineGraphProps<T>) => {
  const primaryColor = useToken('colors', 'primary.main')[0];
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
            // flip with the mode — recharts won't resolve 'gray.1200' itself.
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
            // The tooltip surface stays light in both modes, so the label keeps
            // a fixed near-black. Must be a CSS var, not 'gray.1500' — recharts
            // won't resolve Chakra tokens (see XAxis/YAxis above).
            labelStyle={{
              color: 'var(--chakra-colors-gray-1500)',
            }}
          />
          {displayLegend && (
            <Legend
              wrapperStyle={{
                bottom: -16,
              }}
            />
          )}
          {dataKeys.map(({ key, label, color }) => (
            <Line
              key={`line-${key}`}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={color ?? primaryColor}
              dot={{ r: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
