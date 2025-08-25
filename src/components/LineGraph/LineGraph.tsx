import { Box, useTheme, useToken } from '@chakra-ui/react';
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
  isLegend = true,
  ...rest
}: LineGraphProps<T>) => {
  const theme = useTheme();
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
            stroke={theme.colors.gray[400]}
          />
          <XAxis
            dataKey="name"
            // Color of line
            stroke="transparent"
            // Props of text
            tick={{
              fill: theme.colors.gray[1200],
              fontSize: useToken('fontSizes', 'sm'),
            }}
            tickMargin={8}
          />
          <YAxis
            // Color of line
            stroke="transparent"
            // Props of text
            tick={{
              fill: theme.colors.gray[1200],
              fontSize: useToken('fontSizes', 'sm'),
            }}
            tickMargin={0}
          />
          <Tooltip
            // invert label color since mode inside tooltip is different
            labelStyle={{
              color: theme.colors.gray[1500],
            }}
          />
          {isLegend && (
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
              stroke={
                color ??
                useToken('colors', theme.semanticTokens.colors.primary.main)
              }
              dot={{ r: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
