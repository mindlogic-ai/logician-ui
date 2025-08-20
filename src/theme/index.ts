import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#E6F7FF",
      100: "#B3EDFF",
      200: "#80E0FF",
      300: "#4DD4FF",
      400: "#1AC7FF",
      500: "#00B8E6",
      600: "#0091B3",
      700: "#006B80",
      800: "#00454D",
      900: "#001F1A",
      main: "#00B8E6",
    },
    secondary: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  semanticTokens: {
    colors: {
      primary: {
        main: "primary.500",
      },
    },
  },
});

export default theme;
