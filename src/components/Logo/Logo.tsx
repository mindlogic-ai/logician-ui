import Image from 'next/image';

import { LogoProps, LogoSizes } from './Logo.types';

export const Logo = ({
  alt = 'Mindlogic Logo',
  src = '/assets/images/logo.png',
  size = 'default',
  ...rest
}: LogoProps) => {
  const sizeObj = LogoSizes[size] ?? LogoSizes['default'];
  return (
    <Image
      width={sizeObj.width}
      height={sizeObj.height}
      src={src}
      alt={alt}
      {...rest}
    />
  );
};
