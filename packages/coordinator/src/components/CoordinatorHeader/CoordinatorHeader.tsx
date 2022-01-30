import { IconButton } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./CoordinatorHeader.module.scss";
import LittleLogo from "../../assets/blood-bank-zichron-Little-logo.svg";
import ZMLogo from "../../assets/zm_logo.svg";
import { ReactComponent as FeatherLogOut } from "../../assets/icons/logOut.svg";
import { ReactComponent as ReportIcon } from "../../assets/icons/report.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as ScheduleIcon } from "../../assets/icons/schedule.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/icons/notifications.svg";
import { ReactComponent as ChevronRight } from "../../assets/icons/chevron-right.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { signOut } from "../../firebase/FirebaseAuthentication";
import classNames from "classnames";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

export enum HeaderVariant {
  SECONDARY,
  INFO,
}

export interface CoordinatorHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  hasNotificationsIcon?: boolean;
  onNotificationsClick?: () => void;
  hasBurgerMenu?: boolean;
  variant: HeaderVariant;
  onBack?: () => void;
  stickyComponent?: React.ReactNode;
}

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function CoordinatorHeader(props: CoordinatorHeaderProps) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className={styles.appHeader}>
      <div className={styles.headerRow}>
        <RightIcon
          {...props}
          onMenuClick={() => setShowSideBar(!showSideBar)}
        />
        <HeaderContent {...props} />
        <LeftIcon {...props} />
      </div>

      {props.stickyComponent && (
        <div className={styles.stickyComponent}>{props.stickyComponent}</div>
      )}

      <HeaderMenu showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </div>
  );
}

function HeaderContent(props: CoordinatorHeaderProps) {
  if (props.title) {
    const className =
      props.variant === HeaderVariant.SECONDARY
        ? styles.secondaryTitle
        : styles.infoTitle;
    return (
      <div className={classNames(styles.title, className)}>{props.title}</div>
    );
  }

  return (
    <div className={styles.title}>
      <img src={LittleLogo} alt={"Blood Bank"} className={styles.logoImage} />
    </div>
  );
}

function HeaderMenu(props: {
  showSideBar: boolean;
  setShowSideBar: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Drawer
      open={props.showSideBar}
      onClose={() => props.setShowSideBar(false)}
      dir={"rtl"}
    >
      <MenuItem
        title={""}
        onClick={() => props.setShowSideBar(false)}
        icon={<BackIcon className={styles.menuBack} />}
      />
      <MenuItem
        title={"ניהול תורים"}
        onClick={() => navigate(CoordinatorScreenKey.SCHEDULE)}
        icon={<ScheduleIcon />}
        selected={location.pathname.includes(CoordinatorScreenKey.SCHEDULE)}
      />
      <MenuItem
        title={"חיפוש תורמים"}
        onClick={() => navigate(CoordinatorScreenKey.DONORS)}
        icon={<SearchIcon />}
        selected={location.pathname.includes(CoordinatorScreenKey.DONORS)}
      />
      <MenuItem
        title={"דוחות"}
        onClick={() => navigate(CoordinatorScreenKey.REPORTS)}
        icon={<ReportIcon />}
        selected={location.pathname.includes(CoordinatorScreenKey.REPORTS)}
      />

      <Divider />

      <MenuItem
        title={"התנתקות"}
        onClick={() => {
          signOut();
          props.setShowSideBar(false);
        }}
        icon={<FeatherLogOut />}
      />

      <img src={ZMLogo} alt={"logo"} className={styles.zmLogoImage} />
      <div className={styles.version}>{appVersion}</div>
    </Drawer>
  );
}

function RightIcon(
  props: CoordinatorHeaderProps & { onMenuClick: () => void }
) {
  const navigate = useNavigate();
  if (props.hasBurgerMenu) {
    return (
      <IconButton onClick={props.onMenuClick} className={styles.rightButton}>
        <MenuIcon />
      </IconButton>
    );
  } else if (props.hasBackButton) {
    return (
      <IconButton
        onClick={props.onBack ? props.onBack : () => navigate(-1)}
        className={styles.rightButton}
      >
        <ChevronRight />
      </IconButton>
    );
  }

  return null;
}

const HIDE_NOTIFICATION_BUTTON = true;
function LeftIcon(props: CoordinatorHeaderProps) {
  if (HIDE_NOTIFICATION_BUTTON) {
    return null;
  }

  if (props.hasNotificationsIcon) {
    return (
      <IconButton
        onClick={props.onNotificationsClick}
        className={styles.leftButton}
      >
        <NotificationsIcon />
      </IconButton>
    );
  }

  return null;
}

function MenuItem(props: {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <ListItem button onClick={props.onClick} className={styles.listItem}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <div
        className={classNames({
          [styles.listItemTitle]: true,
          [styles.selectedTitle]: props.selected,
        })}
      >
        {props.title}
      </div>
    </ListItem>
  );
}
