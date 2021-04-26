import React from "react";
import { NavItems, NavItemsProps } from "../NavItems";

import styles from "./SideDrawer.module.scss";
import classNames from "classnames";

export interface ISideDrawerProps {
  isOpen: boolean;
  navProps: NavItemsProps;
  close: () => void;
}

export const SideDrawer: React.FC<ISideDrawerProps> = ({
  isOpen,
  navProps,
  close,
}) => {
  return (
    <div
      className={classNames(
        styles.SideDrawer,
        isOpen ? styles.Open : styles.Close
      )}
    >
      isOpen && <NavItems navItemsProps={navProps.navItemsProps} />
    </div>
  );
};
