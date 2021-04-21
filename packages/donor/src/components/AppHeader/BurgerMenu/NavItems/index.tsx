import React from "react";

import styles from "./NavItems.module.scss";

export interface NavItemProps {
  title: string;
  onClick: () => void;
}

export interface NavItemsProps {
  navItemsProps: NavItemProps[];
}

export const NavItems: React.FC<NavItemsProps> = ({ navItemsProps }) => {
  return (
    <ul className={styles.NavItems}>
      {navItemsProps.map((navItemProp) => (
        <li
          className={styles.NavItem}
          key={navItemProp.title}
          onClick={navItemProp.onClick}
        >
          {navItemProp.title}
        </li>
      ))}
    </ul>
  );
};
