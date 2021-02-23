// import React from 'react'
import Button from "../Button";
import styles from "./MyProfileDrawer.module.scss";
import classNames from "classnames";

interface MyProfileDrawerProps {
  children?: React.ReactNode;
  visible?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

export default function MyProfileDrawer(props: MyProfileDrawerProps) {
  const componentClassname = classNames({
    [styles.component]: true,
    [styles.hidden]: !props.visible,
  });

  return (
    <div className={componentClassname}>
      <div className={styles.background} onClick={props.onCancel}></div>
      <div className={styles.drawer}>
        {props.children}
        <Button
          className={styles.drawerButton}
          onClick={() => props.onSave}
          title="save"
        />
      </div>
    </div>
  );
}
