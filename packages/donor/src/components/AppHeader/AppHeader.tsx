import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { BurgerMenu } from "./BurgerMenu";
import { useState } from "react";
import { SideDrawer } from "./BurgerMenu/SideDrawer";
import { Backdrop } from "../Backdrop";
import firebase from "firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      color: theme.palette.info.main,
    },
    title: {
      textAlign: "center",
      padding: theme.spacing(1),
      fontWeight: "bold",
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
      <Toolbar>
        <Grid container>
          <Grid item xs>
            {hasBurgerMenu && (
              <BurgerMenu
                onClick={() => setShowSideBar((previous) => !previous)}
              />
            )}
          </Grid>
          <Grid item xs>
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
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
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
