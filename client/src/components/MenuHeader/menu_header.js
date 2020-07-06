import React from "react";
import BackArrow from "../BackArrow";
import BurgerMenu from "../burgerMenu";
import "./menuHeader.css";
import LanguageSwitch from "../languageSwich/LanguageSwitch";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

let styles = {
  header: {
    alignItems: "center",
    backgroundColor: "#d5068d",
    color: "black",
    // borderBottom: '1px solid black',
    height: "60px",
  },
};

const Menu_header = (props) => {
  const { t } = useTranslation();



  return (
    <div className="headerBody">
      <div className="burger">
        {props.icon === "backArrow" ? (
        <BackArrow size ="3x" color = "white" marginLeft = "5px" marginTop = "12px" />
        ) : props.icon === "burger" ? (
          <BurgerMenu />
        ) : null}
      </div>

      <div className="title">{props.title}</div>

      <LanguageSwitch />
    </div>
  );
};

export default Menu_header;
