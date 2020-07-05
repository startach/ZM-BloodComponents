import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const LanguageSwitch = ({ languageSelected }) => {
  const [lang, setLang] = useState(languageSelected);


  const handleChange = (e) => {
    setLang(languageSelected);
    i18next.changeLanguage(e.target.value);
    window.location.reload(false)
    // console.log(languageSelected);
  };

  // useEffect(() => {
  //   // setLang(languageSelected)
  // }, [lang])

  return (
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
      </div>{" "}
    </div>
  );
};

export default LanguageSwitch;
