import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeOptions,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import MuiGlobalTheme from "../constants/MuiGlobalTheme";

const globalTheme = createTheme(MuiGlobalTheme as ThemeOptions);

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function WithGlobalTheme(props: any) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
}
