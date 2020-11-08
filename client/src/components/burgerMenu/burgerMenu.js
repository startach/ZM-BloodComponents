import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import "./burgerMenu.css";
import { useTranslation } from "react-i18next";
import { getAuthorizedPages } from "../../services/userService";

const BurgerMenu = () => {
  const languageSelected = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  const [pages, setPages] = useState();

  useEffect(() => {
    const getUserLevel = async () => {
      const pageDocs = (await getAuthorizedPages()).docs
      
      const pageList = pageDocs
        .map((doc) => {
          return {
            name: doc.data().name,
            url: doc.data().url,
            index: doc.data().index,
          };
        })
        .sort((a, b) => a.index - b.index);

      setPages(pageList);
    };
    getUserLevel();
  }, []);

  const handleLogout = () => {
    // remove localstored userid
    localStorage.removeItem("userid");
    //localStorage.removeItem('photoURL');
    localStorage.removeItem("userLevel");
    //email password sign out & google signout
    auth.signOut();
  };

  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "40px",
      height: "30px",
      left: languageSelected === "en" ? "10px" : "none",
      right: languageSelected !== "en" ? "10px" : "none",
      top: "20px",
    },
    bmBurgerBars: {
      background: "white",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "25px",
    },
    bmCross: {
      background: "black",
    },
    bmMenuWrap: {
      position: "absolute",
      top: "70px",
      left: "0px",
      height: "auto",
      transition: "all 1s ease",
      borderRadius: "4px",
      zIndex: "-1",
    },
    bmMenu: {
      background: "#d5068d",
      padding: "1.0em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: ".5em",
    },
    bmItem: {
      color: "#E4FDFF",
      paddingTop: ".8em",
      paddingBottom: ".8em",
      outline: "none",
      textDecoration: "none",
      textAlign: "start",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0)",
      position: "fixed",
      width: "30px",
      height: "30px",
      left: languageSelected === "en" ? "12px" : "none",
      right: languageSelected !== "en" ? "12px" : "none",
      top: "12px",
    },
  };
  return (
    <div>
      <Menu styles={styles} right={languageSelected !== "en"}>
        {pages?.map((page) => {
          return (
            <div>
              <Link to={page.url} className="link">
                {t("burgerMenu." + page.name)}
              </Link>
              <div className="line" />
            </div>
          );
        })}
        {/* <div className="line"></div>
        <Link to='/Emergency' className="link">
        {t('burgerMenu.emergencyDonation')} 
            </Link> */}
        <Link to="/login" className="link" onClick={handleLogout}>
          {t("burgerMenu.Logout")}
        </Link>
      </Menu>
    </div>
  );
};

export default BurgerMenu;
