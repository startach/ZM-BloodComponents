import { ThemeOptions } from "@mui/material/styles";
import colors from "./colors";

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
      main: colors.gray,
    },
    action: {
      disabled: colors.gray,
      disabledBackground: colors.light,
    },
  },
  typography: {
    fontFamily: ["Rubik"].join(","),
  },
};

export default MuiGlobalTheme;
