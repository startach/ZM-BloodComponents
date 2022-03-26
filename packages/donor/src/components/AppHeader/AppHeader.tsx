import { IconButton } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
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
import LittleLogo from "../../assets/icons/blood-bank-zichron-Little-logo.svg";
import { isLoggedIn } from "../../firebase/FirebaseInitializer";
import profileIcon from "../../assets/mobile/profile-icon.svg";
import ZMLogo from "../../assets/mobile/zm_logo.svg";
import { ReactComponent as FeatherLogOut } from "../../assets/icons/feather_log_out.svg";
import { ReactComponent as FeatherLogIn } from "../../assets/icons/feather_log_in.svg";
import { ReactComponent as ZMLineIcon } from "../../assets/icons/ZM_line_icon.svg";
import { ReactComponent as SimpleWhatsapp } from "../../assets/icons/simple-whatsapp.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-icon.svg";
import { ReactComponent as FeedBackIcon } from "../../assets/icons/feedback_icon.svg";
import { ReactComponent as FeatherInfo } from "../../assets/icons/feather-info.svg";
import { signOut } from "../../screens/authentication/FirebaseAuthentication";
import { reportClick } from "../../Analytics";
import { isProduction } from "@zm-blood-components/common";

export interface AppHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  hasBurgerMenu?: boolean;
  onBack?: () => void;
}

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function AppHeader({
  hasBackButton,
  onBack,
  title,
  hasBurgerMenu,
}: AppHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const loggedIn = isLoggedIn();

  let icon = null;
  if (hasBurgerMenu) {
    icon = (
      <IconButton
        onClick={() => setShowSideBar((previous) => !previous)}
        className={styles.rightButton}
      >
        <MenuIcon />
      </IconButton>
    );
  } else if (hasBackButton) {
    icon = (
      <IconButton
        onClick={onBack ? onBack : () => navigate(-1)}
        className={styles.rightButton}
      >
        <ArrowForward />
      </IconButton>
    );
  }

  let headerContent;
  if (title) {
    let headerTitle = title;
    if (!isProduction()) {
      headerTitle += " 🛠️";
    }
    headerContent = <div className={styles.title}>{headerTitle}</div>;
  } else {
    headerContent = (
      <div className={styles.title}>
        <img src={LittleLogo} alt={"Blood Bank"} className={styles.logoImage} />
        {" 🛠"}
      </div>
    );
  }

  let loginIcon = null;
  if (hasBurgerMenu && !loggedIn) {
    loginIcon = (
      <div
        className={styles.login}
        onClick={() => navigate(MainNavigationKeys.Login)}
      >
        <p className={styles.login_text}>{"כניסה"}</p>
        <img alt={"התחבר"} src={profileIcon} />
      </div>
    );
  }

  const reportButtonClick = (buttonName: string) => {
    reportClick(location.pathname, buttonName);
  };

  return (
    <div className={styles.appHeader}>
      {icon}
      {headerContent}
      {loginIcon}
      <Drawer
        open={showSideBar}
        onClose={() => setShowSideBar(false)}
        dir={"rtl"}
      >
        <List>
          <MenuItem
            title={"הפרופיל שלי"}
            onClick={() => {
              reportButtonClick("ToMyProfile");
              navigate(MainNavigationKeys.MyProfile);
            }}
            icon={<ProfileIcon />}
          />
          <MenuItem
            title={"תהליך התרומה"}
            onClick={() => {
              reportButtonClick("ToProcess");
              navigate(MainNavigationKeys.Process);
            }}
            icon={<ZMLineIcon />}
          />
          <MenuItem
            title={"משוב"}
            onClick={() => {
              reportButtonClick("ToFeedbackForm");
              window.open("https://forms.gle/xFoUfhx8sNUujJVy8");
            }}
            icon={<FeedBackIcon />}
          />
          <MenuItem
            title={"אודות"}
            onClick={() => {
              reportButtonClick("ToAbout");
              navigate(MainNavigationKeys.About);
            }}
            icon={<FeatherInfo />}
          />
          <MenuItem
            title={"צור קשר"}
            onClick={() => {
              reportButtonClick("ToContact");
              navigate(MainNavigationKeys.Contact);
            }}
            icon={<SimpleWhatsapp />}
          />
        </List>
        <Divider />

        {loggedIn ? (
          <>
            <MenuItem
              title={"התנתקות"}
              onClick={() => {
                signOut();
                setShowSideBar(false);
              }}
              icon={<FeatherLogOut />}
            />
          </>
        ) : (
          <>
            <MenuItem
              title={"כניסה"}
              onClick={() => {
                navigate(MainNavigationKeys.Login);
                setShowSideBar(false);
              }}
              icon={<FeatherLogIn />}
            />
          </>
        )}

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
