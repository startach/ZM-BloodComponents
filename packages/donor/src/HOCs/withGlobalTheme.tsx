import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const globalTheme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    primary: {
      light: "#c7007d",
      main: "#c7007d",
    },
    secondary: {
      light: "#347d8d",
      main: "#347d8d",
    },
    info: {
      light: "#f3f5f7",
      main: "#f3f5f7",
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
