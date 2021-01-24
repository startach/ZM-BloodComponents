import i18next from "i18next";
import React from "react";
import Helmet from 'react-helmet'

const LanguageSwitch = (props, { languageSelected }) => {

  const handleChange = (e) => {
    i18next.changeLanguage(e.target.value);
    window.location.reload(false);
  };

  return (
    <div className="language" style={{ 'marginRight': props.marginRight }}>
      <div>
        <select
          className="lang"
          style={{ width: "50px" }}
          onChange={handleChange}>
          <option value={i18next.language}>
            {i18next.language === "heb"
              ? "עִברִית"
              : i18next.language === "ara"
                ? "عربى"
                : "en"}
          </option>
          {i18next.language !== "heb" ? (
            <option value="heb" >עִברִית</option>
          ) : null}
          {i18next.language !== "ara" ? <option value="ara">عربى</option> : null}
          {i18next.language !== "en" ? <option value="en">en</option> : null}
        </select>
      </div>{" "}
      <Helmet htmlAttributes={{ lang: i18next.language }} />
    </div>
  );
};

export default LanguageSwitch;
