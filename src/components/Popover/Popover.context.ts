import React from 'react';

export interface PopoverContextValue {
  baseFontSize: string | number;
}

export const PopoverContext = React.createContext<PopoverContextValue>({
  baseFontSize: '14px',
});

export const usePopoverContext = () => React.useContext(PopoverContext);
