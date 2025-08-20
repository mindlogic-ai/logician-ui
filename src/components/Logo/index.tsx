import Image from 'next/image';

import { LogoProps, LogoSizes } from './Logo.types';

export const Logo = ({
  size = 'default',
  src = '/assets/images/logo.png',
  alt = 'Mindlogic Logo',
}: LogoProps) => {
  const sizeObj = LogoSizes[size] ?? LogoSizes['default'];
  return (
    <Image
      width={sizeObj.width ?? 'auto'}
      height={sizeObj.height ?? 'auto'}
      src={src}
      alt={alt}
    />
  );
};
