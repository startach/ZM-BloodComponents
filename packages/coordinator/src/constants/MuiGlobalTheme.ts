import { ThemeOptions } from "@material-ui/core";
import colors from "./colors";

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
};

export default MuiGlobalTheme;
