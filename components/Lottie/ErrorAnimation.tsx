import dynamic from 'next/dynamic';

import theme from '@/theme';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export const ErrorAnimation = () => {
  return (
    <Lottie
      path="/assets/lottie/error.json"
      play
      loop={false}
      speed={2}
      segments={[0, 48]} // end after one bounce of the !
      style={{ width: '52px', fill: theme.semanticTokens.colors.primary.main }}
    />
  );
};
