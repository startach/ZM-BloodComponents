import { IconButton } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./CoordinatorHeader.module.scss";
import LittleLogo from "../../assets/blood-bank-zichron-Little-logo.svg";
import ZMLogo from "../../assets/zm_logo.svg";
import { ReactComponent as FeatherLogOut } from "../../assets/feather_log_out.svg";

export interface AppHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  onBack?: () => void;
  onSignOut: () => void;
}

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function CoordinatorHeader(props: AppHeaderProps) {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);

  let icon = null;
  if (props.hasBurgerMenu) {
    icon = (
      <IconButton
        onClick={() => setShowSideBar((previous) => !previous)}
        className={styles.rightButton}
      >
        <MenuIcon />
      </IconButton>
    );
  } else if (props.hasBackButton) {
    icon = (
      <IconButton
        onClick={props.onBack ? props.onBack : () => history.goBack()}
        className={styles.rightButton}
      >
        <ArrowForward />
      </IconButton>
    );
  }

  let headerContent;
  if (props.title) {
    headerContent = <div className={styles.title}>{props.title}</div>;
  } else {
    headerContent = (
      <div className={styles.title}>
        <img src={LittleLogo} alt={"Blood Bank"} className={styles.logoImage} />
      </div>
    );
  }

  return (
    <div className={styles.appHeader}>
      {icon}
      {headerContent}
      <Drawer
        open={showSideBar}
        onClose={() => setShowSideBar(false)}
        dir={"rtl"}
      >
        {/*<List>*/}
        {/*  <MenuItem*/}
        {/*    title={"הפרופיל שלי"}*/}
        {/*    onClick={() => history.push("/" + MainNavigationKeys.MyProfile)}*/}
        {/*    icon={<ProfileIcon />}*/}
        {/*  />*/}
        {/*</List>*/}
        <Divider />

        <MenuItem
          title={"התנתקות"}
          onClick={() => {
            props.onSignOut();
            setShowSideBar(false);
          }}
          icon={<FeatherLogOut />}
        />

        <img src={ZMLogo} alt={"logo"} className={styles.zmLogoImage} />
        <div className={styles.version}>{appVersion}</div>
      </Drawer>
    </div>
  );
}

function MenuItem(props: {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <ListItem button onClick={props.onClick} className={styles.listItem}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  );
}
