import React, { forwardRef } from 'react';

import * as Icons from './Icons';

// Icon wrapper for legacy compatibility
export type IconProps = {
  icon?: string | React.ReactElement;
  boxSize?: string;
  color?: string;
  [key: string]: any;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon, boxSize = 'md', color, ...rest }, ref) => {
    // JSX element passed directly
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { boxSize, color, ref, ...rest } as any);
    }

    // String icon name - map to new icon components
    if (typeof icon === 'string') {
      const IconComponent = (Icons as any)[icon];

      if (!IconComponent) {
        console.warn(
          `Icon "${icon}" not found. Available icons:`,
          Object.keys(Icons)
        );
        return null;
      }

      // Optional: Add deprecation warning in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[Deprecated] Using <Icon icon="${icon}" /> is deprecated. ` +
          `Please use <${icon} /> directly for better tree-shaking. ` +
          `Example: import { ${icon} } from '@mindlogic-ai/logician-ui'`
        );
      }

      return (
        <IconComponent boxSize={boxSize} color={color} ref={ref} {...rest} />
      );
    }

    // No icon provided
    return null;
  }
);

Icon.displayName = 'Icon';
