import React from "react";
import AppHeader from "../../AppHeader";
import styles from "./ZMScreen.module.scss";
import classnames from "classnames";

interface ExtendedSignupScreenProps {
  children: React.ReactNode;
  className?: string;
  hasBackButton?: boolean;
  onBack?: () => void;
  hasBurgerMenu?: boolean;
  title?: string;
  padding?: boolean;
}

export default function ZMScreen({
  children,
  className = "",
  hasBackButton,
  onBack,
  hasBurgerMenu,
  title,
  padding = false,
}: ExtendedSignupScreenProps) {
  const contentClassNames = [className, styles.content];
  if (padding) {
    contentClassNames.push(styles.padding);
  }

  return (
    <div className={styles.component}>
      <AppHeader
        title={title}
        hasBurgerMenu={hasBurgerMenu}
        hasBackButton={hasBackButton}
        onBack={onBack}
      />
      <div className={styles.header_underline} />
      <div className={classnames(contentClassNames)}>{children}</div>
    </div>
  );
}
