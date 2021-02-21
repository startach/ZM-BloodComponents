import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { AccountCircle, ArrowForward } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../MainNavigationKeys";

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

const getPathDetails = (path?: string) => {
  let title: string = "דף ראשי";
  let hasBackButton: boolean = false;

  const pathName = path?.replace("/", "");

  switch (pathName) {
    case MainNavigationKeys.BookDonation:
      title = "תרומת טרומבוציטים";
      break;
    case MainNavigationKeys.DonationHistory:
      title = "היסטוריית תרומות";
      break;
    case MainNavigationKeys.MyProfile:
      title = "פרופיל משתמש";
      break;
    case MainNavigationKeys.Questionnaire:
      title = "שאלון התאמה";
      hasBackButton = true;
      break;
    case MainNavigationKeys.UpcomingDonation:
      title = "תורים מתוכננים";
      break;
    case MainNavigationKeys.UpdateApp:
      break;
    case MainNavigationKeys.Home:
    default:
      title = "דף ראשי";
      break;
  }

  return { title, hasBackButton };
};

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
const { title, hasBackButton } = getPathDetails(location?.pathname);

const handleClickIcon = () => {
  if (hasBackButton) {
    history.goBack()
  } else {
    history.push("/" + MainNavigationKeys.MyProfile)
  }
}
  
  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <Grid container>
          <Grid item xs>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={ handleClickIcon }
            >
              {hasBackButton ? <ArrowForward /> : <AccountCircle />}
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
