import React from "react";
import { StylesProvider } from "@material-ui/core";
import WithGlobalTheme from "../src/HOCs/withGlobalTheme";
import { Story, StoryContext } from "@storybook/react";

// https://github.com/mui-org/material-ui/issues/9492#issuecomment-657609780
const generateClassName = () => {
  let counter = 0;
  return (rule: any, styleSheet: any) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}-${counter++}`;
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
    <div dir="rtl">
      <WithStableMuiClassnames>
        <WithGlobalTheme>
          <Story {...context} />
        </WithGlobalTheme>
      </WithStableMuiClassnames>
    </div>
  );
};
export const decorators = [withMuiProvider];
