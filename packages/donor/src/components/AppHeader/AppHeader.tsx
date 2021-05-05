import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Typography, IconButton } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { BurgerMenu } from "./BurgerMenu";
import { useState } from "react";
import { SideDrawer } from "./BurgerMenu/SideDrawer";
import { Backdrop } from "../Backdrop";
import firebase from "firebase";

import styles from "./style.module.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      color: theme.palette.info.main,
    },
  })
);

interface AppHeaderProps {
  title: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
}

export default function ButtonAppBar({
  hasBackButton,
  title,
  hasBurgerMenu,
}: AppHeaderProps) {
  const classes = useStyles();
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);

  if (!title) {
    console.error("Unknown pathname");
  }
  return (
    <AppBar position="fixed" color="secondary">
      <div className={styles.headerContainer}>
        {hasBurgerMenu && (
          <div className={styles.headerItem}>
            <BurgerMenu
              onClick={() => setShowSideBar((previous) => !previous)}
            />
          </div>
        )}
        {hasBackButton && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}
          >
            <ArrowForward />
          </IconButton>
        )}
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </div>
      <div>
        <SideDrawer
          isOpen={showSideBar}
          close={() => setShowSideBar(false)}
          navProps={{
            navItemsProps: [
              {
                title: "הפרופיל שלי",
                onClick: () => history.push("/" + MainNavigationKeys.MyProfile),
              },
              {
                title: "אודות",
                onClick: () => history.push("/" + MainNavigationKeys.About),
              },
              {
                title: "התנתק",
                onClick: () => firebase.auth().signOut(),
              },
            ],
          }}
        />
        {showSideBar && <Backdrop close={() => setShowSideBar(false)} />}
      </div>
    </AppBar>
  );
}
