import React from "react";
import { StylesProvider } from "@material-ui/core";
import WithGlobalTheme from "../src/HOCs/withGlobalTheme";
import { Story, StoryContext } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "../src/styles/index.scss";
import { Parameters } from "@storybook/addons/dist/ts3.9/types";
import { MemoryRouter } from "react-router-dom";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { he } from "date-fns/locale";

// https://github.com/mui-org/material-ui/issues/9492#issuecomment-657609780
const generateClassName = () => {
  let counter = 0;
  return (rule: any, styleSheet: any) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}-${counter++}`;
};

export const parameters: Parameters = {
  viewport: {
    viewports: {
      zmTabletSmall: {
        name: "ZM tablet (Small)",
        styles: {
          width: "900px",
          height: "1600px",
        },
        type: "tablet",
      },
      zmTabletBig: {
        name: "ZM tablet (Big)",
        styles: {
          width: "1200px",
          height: "2000px",
        },
        type: "tablet",
      },
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: "iphonex",
  },
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
};

export default function WithStableMuiClassnames(props: {
  children: React.ReactNode;
}) {
  return (
    <StylesProvider generateClassName={generateClassName()}>
      {props.children}
    </StylesProvider>
  );
}

const withMuiProvider = (Story: Story, context: StoryContext) => {
  return (
    <div dir="rtl" style={{ height: "100vh" }}>
      <MemoryRouter>
        <WithStableMuiClassnames>
          <WithGlobalTheme>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
              <Story {...context} />
            </MuiPickersUtilsProvider>
          </WithGlobalTheme>
        </WithStableMuiClassnames>
      </MemoryRouter>
    </div>
  );
};
export const decorators = [withMuiProvider];
