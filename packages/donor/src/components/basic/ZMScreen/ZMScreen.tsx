import React from "react";
import AppHeader from "../../AppHeader";
import styles from "./ZMScreen.module.scss";
import classnames from "classnames";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  title?: string;
  fullWidth?: boolean;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton,
  hasBurgerMenu,
  title,
  fullWidth = false,
}: ExtendedSignupScreenProps) {
  const contentClassNames = [className, styles.content];
  if (!fullWidth) {
    contentClassNames.push(styles.padding);
  }

  return (
    <div className={styles.component}>
      <AppHeader
        title={title}
        hasBurgerMenu={hasBurgerMenu}
        hasBackButton={hasBackButton}
      />
      <div className={classnames(contentClassNames)}>{children}</div>
    </div>
  );
}
