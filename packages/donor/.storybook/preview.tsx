import React from "react";
import { StylesProvider } from "@material-ui/core";
import WithGlobalTheme from "../src/HOCs/withGlobalTheme";
import { Story, StoryContext } from "@storybook/react";
import "../src/styles/index.scss";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MemoryRouter } from "react-router-dom";

// https://github.com/mui-org/material-ui/issues/9492#issuecomment-657609780
const generateClassName = () => {
  let counter = 0;
  return (rule: any, styleSheet: any) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}-${counter++}`;
};

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
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
            <Story {...context} />
          </WithGlobalTheme>
        </WithStableMuiClassnames>
      </MemoryRouter>
    </div>
  );
};
export const decorators = [withMuiProvider];
