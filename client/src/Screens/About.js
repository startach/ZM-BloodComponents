import React from "react";
import {Link} from "react-router-dom";

import ScreenContainer from "../components/screen";
import MenuHeader from "../components/MenuHeader";
import BottomNavBar from "../components/BottomNavBar/BottomBar";
import {useTranslation} from "react-i18next";
import "../components/Dashboard/dashboard.css";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <MenuHeader title={t("screens.about")} icon="burger" />
      <div className="introContainer infoPagesAlign">
        <div className="introSpan">{t("about.title")}</div>
        <div className="introSpan">
          <span>{t("about.firstP")}</span>
          <a href="https://zichron.org">{t("about.ourSite")} </a>
          <span>{t("about.firstPEnd")}</span>
        </div>
        <div className="introSpan">
          <span>{t("about.secondP")}</span>{" "}
        </div>
        <div className="introSpan">
          <span>{t("about.thirdP")}</span>{" "}
          <Link id="link" to="/register">
            {t("about.register")}
          </Link>
          <span>{t("about.thirdPEnd")}</span>
        </div>
        <div className="introSpan">{t("about.fourthP")}</div>
        <div className="introSpan">{t("about.fifthP")}</div>
        <div className="introSpan">
          <span>{t("about.sixthP")}</span>
          <a href="https://zichron.org">{t("about.ourSite")} </a>
          <span>{t("about.sixthPEnd")}</span>
          <Link id="link" to="/contactus">
            {t("about.contact")}
          </Link>
        </div>
        <div className="introSpan">{t("about.seventhP")}</div>
        <div className="introSpan">
          <span>{t("about.eightP")}</span>
          <a href="https://www.startach.org.il/">{t("about.startach")}</a>
        </div>
      </div>

      <BottomNavBar />
      <div className="footer"></div>
    </ScreenContainer>
  );
};

export default ContactUs;
