import { StylesProvider } from "@material-ui/core";
import React from "react";
import WithGlobalTheme from "../HOCs/withGlobalTheme";

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

export function MuiTestWrapper(props: { children: React.ReactNode }) {
  return (
    <div dir="rtl">
      <WithStableMuiClassnames>
        <WithGlobalTheme>{props.children}</WithGlobalTheme>
      </WithStableMuiClassnames>
    </div>
  );
}
