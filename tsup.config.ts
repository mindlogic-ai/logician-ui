import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: false, // Disabled due to TS errors, can re-enable when errors are fixed
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@chakra-ui/react",
    "@emotion/react",
    "@emotion/styled",
    "framer-motion",
  ],
  banner: {
    js: '"use client"',
  },
  treeshake: true,
  minify: false, // Keep readable for debugging, consumers can minify
  onSuccess: 'echo "✅ tsup build completed successfully!"',
});
