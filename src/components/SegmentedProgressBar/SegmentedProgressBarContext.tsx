import React, { createContext, ReactNode, useContext } from 'react';

// TODO: typescript
const SegmentedProgressBarContext = createContext<any>({});
export const useSegmentedProgressBarContext = () =>
  useContext(SegmentedProgressBarContext);

interface SegmentedProgressBarProviderProps {
  children: ReactNode;
  max: number;
}

export function SegmentedProgressBarProvider({
  children,
  max,
}: SegmentedProgressBarProviderProps) {
  return (
    <SegmentedProgressBarContext.Provider value={{ max }}>
      {children}
    </SegmentedProgressBarContext.Provider>
  );
}

export default SegmentedProgressBarContext;
