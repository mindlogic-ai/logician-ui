import { ProgressBar } from '../ProgressBar';
import { ProgressSegmentProps } from './SegmentedProgressBar.types';
import { useSegmentedProgressBarContext } from './SegmentedProgressBarContext';

export const ProgressSegment = ({ value, ...rest }: ProgressSegmentProps) => {
  const { max } = useSegmentedProgressBarContext();
  return (
    <ProgressBar
      value={value}
      max={value}
      width={`${(value / max) * 100}%`}
      height="100%"
      bg="bg.muted"
      borderRadius={0}
      {...rest}
    />
  );
};
