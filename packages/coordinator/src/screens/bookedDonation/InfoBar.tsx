import React from "react";
import styles from "./InfoBar.module.scss";

export type InfoBarProps = {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
};

export default function InfoBar( props : InfoBarProps) {
  return (
    <div className={styles.infoBar}>
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.titleContent}>
        <div>{props.title}</div>
        <div className={styles.values}>{props.children}</div>
      </div>
    </div>
  );
}
