import { inter, noto, pretendard } from "./font";

export const global = {
  ":root": {
    "--chakra-colors-chakra-body-text": "#121315", // gray.1500 hex value
    "--chakra-colors-chakra-body-bg": "#FFFFFF",
  },

  html: {
    height: "var(--chakra-vh)",
    fontSize: 14,
    fontFamily: [
      pretendard.style.fontFamily,
      inter.style.fontFamily,
      noto.style.fontFamily,
    ].join(","),
    overflow: "auto",
  },

  "html, body": {
    color: "gray.1500", // Set the default body color
  },

  "#__next": {
    height: "var(--chakra-vh)",
  },
  "body[data-lang='es']": {
    fontFamily: inter.style.fontFamily,
  },
} as const;
