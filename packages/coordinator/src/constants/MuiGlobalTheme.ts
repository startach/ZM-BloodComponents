import { ThemeOptions } from "@material-ui/core";
import colors from "./colors";

const rubikUrl = "https://fonts.googleapis.com/css2?family=Rubik&display=swap";
const rubikFontFace = {
  fontFamily: "Rubik",
  fontStyle: "normal",
  fontWeight: 400,
  src: `
    url(${rubikUrl}) format('woff2')
  `,
};

const MuiGlobalTheme: ThemeOptions = {
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    primary: {
      light: colors.primary,
      main: colors.primary,
    },
    secondary: {
      light: colors.secondary,
      main: colors.secondary,
    },
    info: {
      light: colors.info,
      main: colors.info,
    },
  },
  typography: {
    fontFamily: ["Rubik"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [rubikFontFace],
      },
    },
  },
};

export default MuiGlobalTheme;
