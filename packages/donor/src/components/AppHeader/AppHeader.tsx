import firebase from "firebase/app";
import "firebase/auth";
import { AppBar, IconButton, Typography } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./style.module.scss";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

export interface AppHeaderProps {
  title: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  className?: string;
}

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function AppHeader({
  hasBackButton,
  title,
  hasBurgerMenu,
  className,
}: AppHeaderProps) {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);

  if (!title) {
    console.error("Unknown pathname");
  }

  let icon = null;
  if (hasBurgerMenu) {
    icon = (
      <IconButton onClick={() => setShowSideBar((previous) => !previous)}>
        <MenuIcon className={styles.rightButton} />
      </IconButton>
    );
  } else if (hasBackButton) {
    icon = (
      <IconButton onClick={() => history.goBack()}>
        <ArrowForward className={styles.rightButton} />
      </IconButton>
    );
  }

  return (
    <AppBar position="static" color="primary" className={className}>
      <div className={styles.headerContainer}>
        {icon}
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </div>
      <Drawer
        open={showSideBar}
        onClose={() => setShowSideBar(false)}
        dir={"rtl"}
      >
        <List>
          <MenuItem
            title={"הפרופיל שלי"}
            onClick={() => history.push("/" + MainNavigationKeys.MyProfile)}
            icon={<AccountCircleOutlinedIcon />}
          />
          <MenuItem
            title={"אודות"}
            onClick={() => history.push("/" + MainNavigationKeys.About)}
            icon={<InfoOutlinedIcon />}
          />
          <MenuItem
            title={"צור קשר"}
            onClick={() => history.push("/" + MainNavigationKeys.Contact)}
            icon={<EmailOutlinedIcon />}
          />
        </List>
        <Divider />

        <MenuItem
          title={"התנתק"}
          onClick={() => firebase.auth().signOut()}
          icon={<LockOutlinedIcon />}
        />

        <div className={styles.version}>{appVersion}</div>
      </Drawer>
    </AppBar>
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
