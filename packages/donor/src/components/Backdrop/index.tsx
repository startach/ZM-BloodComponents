import React from "react";

import styles from "./Backdrop.module.scss";

export interface IBackdropProps {
  close: () => void;
}

export const Backdrop: React.FC<IBackdropProps> = ({ close }) => {
  return <div className={styles.Backdrop} onClick={close} />;
};
