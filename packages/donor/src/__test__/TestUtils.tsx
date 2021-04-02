import React from "react";
import WithGlobalTheme from "../HOCs/withGlobalTheme";

export function MuiTestWrapper(props: { children: React.ReactNode }) {
  return (
    <div dir="rtl">
      <WithGlobalTheme>{props.children}</WithGlobalTheme>
    </div>
  );
}
