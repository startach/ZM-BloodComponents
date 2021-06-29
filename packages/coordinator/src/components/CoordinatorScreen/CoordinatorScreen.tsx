import React from "react";
import styles from "./CoordinatorScreen.module.scss";
import classnames from "classnames";
import EmptyCoordinatorHeader from "../Header/EmptyCoordinatorHeader";

const appVersion = process.env.REACT_APP_VERSION || "dev";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export default function CoordinatorScreen({
  children,
  header,
  className = "",
}: ExtendedSignupScreenProps) {
  const contentClassNames = [className, styles.content];

  return (
    <div className={styles.component}>
      {header || <EmptyCoordinatorHeader />}
      <div className={classnames(contentClassNames)}>{children}</div>
      <div className={styles.footer}>{appVersion}</div>
    </div>
  );
}
