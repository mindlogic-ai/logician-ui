import { Box } from '@chakra-ui/react';
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

import { colors } from '@/theme/colors';

import { DatumBase, LineGraphProps } from './LineGraph.types';

// Theme values for v3 compatibility
const primaryMainColor = colors.blue[900];
const smFontSize = '0.875rem';

export const LineGraph = <T extends DatumBase>({
  data = [],
  dataKeys,
  displayLegend = true,
  ...rest
}: LineGraphProps<T>) => {
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
            stroke={colors.gray[400]}
          />
          <XAxis
            dataKey="name"
            // Color of line
            stroke="transparent"
            // Props of text
            tick={{
              fill: colors.gray[1200],
              fontSize: smFontSize,
            }}
            tickMargin={8}
          />
          <YAxis
            // Color of line
            stroke="transparent"
            // Props of text
            tick={{
              fill: colors.gray[1200],
              fontSize: smFontSize,
            }}
            tickMargin={0}
          />
          <Tooltip
            // invert label color since mode inside tooltip is different
            labelStyle={{
              color: colors.gray[1500],
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
              stroke={color ?? primaryMainColor}
              dot={{ r: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
