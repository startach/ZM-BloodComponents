import React from "react";
import styles from "./HeaderSection.module.scss";
import classNames from "classnames";

export interface HeaderSectionProps extends React.HTMLProps<HTMLDivElement> {}

function HeaderSection({ className, ...props }: HeaderSectionProps) {
  return (
    <header className={classNames(styles.component, className)} {...props} />
  );
}

export default HeaderSection;
