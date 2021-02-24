import React from "react";
import styles from "./ScreenWrapper.module.scss";
import classname from "classnames";
export interface ScreenWrapperProps extends React.HTMLProps<HTMLDivElement> {}

function ScreenWrapper({ className, ...props }: ScreenWrapperProps) {
  return <div className={classname(styles.component, className)} {...props} />;
}

export default ScreenWrapper;
