import React from 'react';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const LanguageSwitch = (props) => {
    const { t } = useTranslation();

    const handleChange = (e) => {
      i18next.changeLanguage(e.target.value);
    };

    return(
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
    )
}

export default LanguageSwitch;