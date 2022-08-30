import { Menu as MuiMenu, MenuItem as MuiMenuItem } from "@mui/material";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import { ReactElement } from "react";
import { reportClick } from "../../../Analytics";

export interface MenuProps {
  children: ReactElement<MenuItemProps>[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  analytics: AnalyticsData;
}

export default function Menu({
  children,
  open,
  anchorEl,
  onClose,
  analytics,
}: MenuProps) {
  const handleClick = ({ analyticsValue, onClick }: MenuItemProps) => {
    if (onClick) {
      onClick();
    }

    if (!analytics) return;

    reportClick(
      AnalyticsButtonType.Menu,
      analytics.analyticsName,
      analyticsValue
    );
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

  return (
    <MuiMenu open={open} anchorEl={anchorEl} onClose={onClose}>
      {children.map(mapItem)}
    </MuiMenu>
  );
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
