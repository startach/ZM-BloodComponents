import { ThemeOptions } from "@material-ui/core";
import colorsV1 from "./colors";
import colorsV2 from "./colors";

const rubikUrl = "https://fonts.googleapis.com/css2?family=Rubik&display=swap";
const rubikFontFace = {
  fontFamily: "Rubik",
  fontStyle: "normal",
  fontWeight: 400,
  src: `
    url(${rubikUrl}) format('woff2')
  `,
};

let useV2Colors = false;
const colors = useV2Colors ? colorsV2 : colorsV1;

const MuiGlobalTheme: ThemeOptions = {
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
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
