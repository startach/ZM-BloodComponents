import React from "react";
import styles from "./InfoBar.module.scss.module.scss";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export type InfoBarProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export default function InfoBar({ title, value, icon }: InfoBarProps) {
  return (
    <div className={styles.infoBar}>
      <ListItemIcon>{icon}</ListItemIcon>
      <div className={styles.titleContent}>
        <div>{title}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}
