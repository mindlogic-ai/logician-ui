import React, { lazy, Suspense } from "react";

// Use lazy loading (works in all React apps)
const Lottie = lazy(() => import("react-lottie-player"));

export const SuccessAnimation = () => {
  return (
    <Suspense fallback={<div style={{ width: "80px", height: "80px" }}></div>}>
      <Lottie
        path="/assets/lottie/check-mark.json"
        play
        loop={false}
        speed={2}
        segments={[0, 50]} // end before the green check fades
        style={{ width: "80px" }}
      />
    </Suspense>
  );
};
