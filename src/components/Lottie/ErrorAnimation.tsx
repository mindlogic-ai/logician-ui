import React, { lazy, Suspense } from "react";
import theme from "../../theme";

// Use lazy loading (works in all React apps)
const Lottie = lazy(() => import("react-lottie-player"));

export const ErrorAnimation = () => {
  return (
    <Suspense fallback={<div style={{ width: "52px", height: "52px" }}></div>}>
      <Lottie
        path="/assets/lottie/error.json"
        play
        loop={false}
        speed={2}
        segments={[0, 48]} // end after one bounce of the !
        style={{
          width: "52px",
          fill: theme.semanticTokens.colors.primary.main,
        }}
      />
    </Suspense>
  );
};
