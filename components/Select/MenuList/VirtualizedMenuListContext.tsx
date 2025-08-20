import { createContext, MutableRefObject, useContext, useRef } from 'react';

// Create a context for each VirtualizedMenuList instance
const VirtualizedMenuListStateContext = createContext<{
  isInitialRender: MutableRefObject<boolean>;
  previousChildrenCount: MutableRefObject<number>;
} | null>(null);

export const useVirtualizedMenuListState = () => {
  const context = useContext(VirtualizedMenuListStateContext);
  if (!context) {
    throw new Error(
      'useVirtualizedMenuListState must be used within a VirtualizedMenuListProvider',
    );
  }
  return context;
};

// Provider component that creates isolated state for each instance
export const VirtualizedMenuListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isInitialRender = useRef(true);
  const previousChildrenCount = useRef(0);

  return (
    <VirtualizedMenuListStateContext.Provider
      value={{ isInitialRender, previousChildrenCount }}
    >
      {children}
    </VirtualizedMenuListStateContext.Provider>
  );
};
