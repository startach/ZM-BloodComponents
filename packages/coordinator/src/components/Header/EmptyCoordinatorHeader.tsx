import React from "react";
import logoImg from "../../assets/logo.svg";
import styles from "./CoordinatorHeader.module.scss";

interface CoordinatorHeaderProps {
  children?: React.ReactNode;
}

export default function EmptyCoordinatorHeader({
  children,
}: CoordinatorHeaderProps) {
  return (
    <div className={styles.navBar}>
      <div className={styles.logoContainer}>
        <img src={logoImg} className={styles.logo} alt={"logo"} />
      </div>
      {children}
    </div>
  );
}
