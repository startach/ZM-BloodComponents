import React from "react";
import styles from "./InfoBar.module.scss";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export type InfoBarProps = {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
};

export default function InfoBar({ title, value, icon}: InfoBarProps) {
  return (
    <div className={styles.infoBar}>
      <div className={styles.icon}>
      {icon}
      </div>
      <div className={styles.titleContent}>
        <div>{title}</div>
        {value}
      </div>
    </div>
  );
}
