import React from "react";

import styles from "./BurgerMenu.module.scss";

export interface IBurgerMenuProps {
  onClick: () => void;
}

export const BurgerMenu: React.FC<IBurgerMenuProps> = ({ onClick }) => {
  return (
    <div className={styles.BurgerMenu} onClick={onClick}>
      <div className={styles.BurgerMenuLine} />
      <div className={styles.BurgerMenuLine} />
      <div className={styles.BurgerMenuLine} />
    </div>
  );
};
