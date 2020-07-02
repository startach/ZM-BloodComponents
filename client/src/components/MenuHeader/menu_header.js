import React from 'react';
import BackArrow from '../BackArrow';
import BurgerMenu from '../burgerMenu'
import './menuHeader.css'
import LanguageSwitch from '../languageSwich/LanguageSwitch';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

let styles = {
    header: {
        alignItems: "center",
        backgroundColor: '#d5068d',
        color: 'black',
        // borderBottom: '1px solid black',
        height: '60px',
    }
}

const Menu_header = (props) => {

    const { t } = useTranslation();

    const handleChange = (e) => {
      i18next.changeLanguage(e.target.value);
    };
  
    return (
        <div className="headerBody">
            <div className="burger">
                {props.icon === 'backArrow' ? <BackArrow/> : props.icon === 'burger' ? <BurgerMenu/> : null}
            </div>

            <div className="title"> 
                {props.title}
            </div>

            <div className="language">
            <div>
        <select
          className="lang"
          style={{ width: "50px" }}
          onChange={handleChange}>
          <option value={i18next.language}>
            {i18next.language == "heb"
              ? "עִברִית"
              : i18next.language == "ara"
              ? "عربى"
              : "en"}
          </option>
          {i18next.language != "heb" ? (
            <option value="heb">עִברִית</option>
          ) : null}
          {i18next.language != "ara" ? <option value="ara">عربى</option> : null}
          {i18next.language != "en" ? <option value="en">en</option> : null}
        </select>
      </div>            </div>
        </div>
    );
}

export default Menu_header;
