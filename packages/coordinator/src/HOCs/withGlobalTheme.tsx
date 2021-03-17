import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeOptions,
} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MuiGlobalTheme from "../constants/MuiGlobalTheme";

const globalTheme = createMuiTheme(MuiGlobalTheme as ThemeOptions);

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function WithGlobalTheme(props: any) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
}
