import React from "react";
import styles from "./Toggle.module.css";
import classNames from "classnames";

export interface ToggleProps {
  enabled: boolean;
  onChange: (newValue: boolean) => void;
  className?: string;
}

export default function Toggle(props: ToggleProps) {
  const classes = [styles.toggleContainer];
  if (props.enabled) {
    classes.push(styles.toggleContainerEnabled);
  }
  if (props.className) {
    classes.push(props.className);
  }

  return (
    <div
      onClick={() => props.onChange(!props.enabled)}
      className={classNames(classes)}
    >
      <div
        className={classNames({
          [styles.toggleCircle]: true,
          [styles.toggleEnabled]: props.enabled,
        })}
      />
    </div>
  );
}
