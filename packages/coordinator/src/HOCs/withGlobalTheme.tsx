import MuiGlobalTheme from "../constants/MuiGlobalTheme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { prefixer } from "stylis";

const globalTheme = createTheme(MuiGlobalTheme);

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function WithGlobalTheme(props: any) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </CacheProvider>
  );
}
