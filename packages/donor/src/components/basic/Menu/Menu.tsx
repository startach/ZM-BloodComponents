import {
  Menu as MuiMenu,
  MenuProps as MuiMenuProps,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { ReactElement } from "react";
import { reportClick } from "../../../Analytics";

export interface MenuProps extends MuiMenuProps {
  /** For logging and Analytics */
  analyticsName: string;
  children: ReactElement<MenuItemProps>[];
}

export default function Menu(props: MenuProps) {
  const handleClick = ({ analyticsValue, onClick }: MenuItemProps) => {
    if (onClick) {
      onClick();
    }
    reportClick(AnalyticsButtonType.Menu, props.analyticsName, analyticsValue);
  };

  const mapItem = (item: ReactElement<MenuItemProps>) => {
    return {
      ...item,
      props: {
        ...item.props,
        onClick: () => handleClick(item.props),
      },
    };
  };

  return <MuiMenu {...props}>{props.children.map(mapItem)}</MuiMenu>;
}

export type MenuItemProps = {
  /** For logging and Analytics */
  analyticsValue: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function MenuItem({ children, className, onClick }: MenuItemProps) {
  return (
    <MuiMenuItem className={className} onClick={onClick}>
      {children}
    </MuiMenuItem>
  );
}
