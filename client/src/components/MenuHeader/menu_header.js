import React from "react";
import BackArrow from "../BackArrow";
import BurgerMenu from "../burgerMenu";
import "./menuHeader.css";
import LanguageSwitch from "../languageSwich/LanguageSwitch";

const Menu_header = (props) => {
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
