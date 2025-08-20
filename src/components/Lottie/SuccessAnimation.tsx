import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export const SuccessAnimation = () => {
  return (
    <Lottie
      path="/assets/lottie/check-mark.json"
      play
      loop={false}
      speed={2}
      segments={[0, 50]} // end before the green check fades
      style={{ width: '80px' }}
    />
  );
};
