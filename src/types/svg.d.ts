declare module '*.svg' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default SVGComponent;
}

declare module '*.svg?react' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default SVGComponent;
}
