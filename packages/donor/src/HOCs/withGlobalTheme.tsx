import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import colors from "../utils/colors";

const globalTheme = createMuiTheme({
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
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function WithGlobalTheme(props: any) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
}
