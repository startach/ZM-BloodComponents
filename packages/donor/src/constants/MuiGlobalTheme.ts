import { ThemeOptions } from "@material-ui/core"
import colors from "./colors"

const MuiGlobalTheme : ThemeOptions = {
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
    // Component styles
    // overrides: {
    //   // MuiButton: {
    //   //   root: {
    //   //     shape: {
    //   //       borderRadius: 100,
    //   //     }
    //   //   }
    //   // },
    //   MuiInput: {
    //     root: {
    //       shape: {
    //         borderRadius: 10
    //       }
    //     }
    //   }
    // }
} 

export default MuiGlobalTheme