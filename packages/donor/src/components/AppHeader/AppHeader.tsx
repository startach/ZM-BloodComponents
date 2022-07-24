import ArrowForward from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
import { AnalyticsButtonType, isProduction } from "@zm-blood-components/common";
import IconButton from "../basic/IconButton";
import { reportClick } from "../../Analytics";

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
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const loggedIn = isLoggedIn();

  let icon = null;
  if (hasBurgerMenu) {
    icon = (
      <IconButton
        analyticsName="burger_menu"
        onClick={() => setShowSideBar((previous) => !previous)}
        className={styles.rightButton}
      >
        <MenuIcon />
      </IconButton>
    );
  } else if (hasBackButton) {
    icon = (
      <IconButton
        analyticsName="back"
        onClick={onBack ? onBack : () => navigate(-1)}
        className={styles.rightButton}
      >
        <ArrowForward />
      </IconButton>
    );
  }

  let headerContent;

  const devEnvIcon = isProduction() ? "" : " 🛠️";

  if (title) {
    let headerTitle = title + devEnvIcon;
    headerContent = <div className={styles.title}>{headerTitle}</div>;
  } else {
    headerContent = (
      <div className={styles.title}>
        <img src={LittleLogo} alt={"Blood Bank"} className={styles.logoImage} />
        {devEnvIcon}
      </div>
    );
  }

  let loginIcon = null;
  if (hasBurgerMenu && !loggedIn) {
    loginIcon = (
      <IconButton
        analyticsName="login"
        className={styles.login}
        onClick={() => navigate(MainNavigationKeys.Login)}
      >
        <p className={styles.login_text}>{"כניסה"}</p>
        <img alt={"התחבר"} src={profileIcon} />
      </IconButton>
    );
  }

  return (
    <div className={styles.appHeader}>
      {icon}
      {headerContent}
      {loginIcon}
      <Drawer open={showSideBar} onClose={() => setShowSideBar(false)}>
        <List>
          <MenuItem
            name="profile"
            title={"הפרופיל שלי"}
            onClick={() => navigate(MainNavigationKeys.MyProfile)}
            icon={<ProfileIcon />}
          />
          <MenuItem
            name="about_process"
            title={"תהליך התרומה"}
            onClick={() => navigate(MainNavigationKeys.Process)}
            icon={<ZMLineIcon />}
          />
          <MenuItem
            name="feedback"
            title={"משוב"}
            onClick={() => window.open("https://forms.gle/xFoUfhx8sNUujJVy8")}
            icon={<FeedBackIcon />}
          />
          <MenuItem
            name="about"
            title={"אודות"}
            onClick={() => navigate(MainNavigationKeys.About)}
            icon={<FeatherInfo />}
          />
          <MenuItem
            name="contact_us"
            title={"צור קשר"}
            onClick={() => navigate(MainNavigationKeys.Contact)}
            icon={<SimpleWhatsapp />}
          />
        </List>
        <Divider />

        {loggedIn ? (
          <>
            <MenuItem
              name="log_out"
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
              name="login"
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
  name: string;
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  //// TODO Move ListItem to component folder && replace ListItem -> ListItemButton in MUI V5
  //// https://mui.com/blog/material-ui-is-now-mui/

  const handleClick = () => {
    props.onClick();
    reportClick(AnalyticsButtonType.ListItem, "burger_menu_item", props.name);
  };

  return (
    <ListItem button onClick={handleClick} className={styles.listItem}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  );
}
