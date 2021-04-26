import React from "react";
import AppHeader from "../../AppHeader";
import styles from "./ZMScreen.module.scss";
import classnames from "classnames";
import SafeScreen from "../SafeScreen";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  title: string;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton,
  hasBurgerMenu,
  title,
}: ExtendedSignupScreenProps) {
  return (
    <SafeScreen disableTopPadding className={styles.component}>
      <AppHeader
        className={"safe-screen-padding-top"}
        {...{ hasBurgerMenu, hasBackButton, title }}
      />
      <div className={classnames(className, styles.content)}>{children}</div>
    </SafeScreen>
  );
}
