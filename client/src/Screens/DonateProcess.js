import React from "react";
import {Link} from "react-router-dom";

import ScreenContainer from "../components/screen";
import MenuHeader from "../components/MenuHeader";
import BottomNavBar from "../components/BottomNavBar/BottomBar";
import {useTranslation} from "react-i18next";
import "../components/Dashboard/dashboard.css";

const DonateProcess = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <MenuHeader title={t("screens.donateProcess")} icon="burger" />
      <div className="introContainer infoPagesAlign">
        <div className="introSpan">{t("donateProcess.title")}</div>
        <div className="introSpan">{t("donateProcess.firstP")}</div>
        <div className="introSpan">{t("donateProcess.secondP")}</div>
        <div className="introSpan">{t("donateProcess.thirdP")}</div>
        <div className="introSpan">{t("donateProcess.fourthP")}</div>
        <div className="introSpan">{t("donateProcess.fifthP")}</div>
        <div className="introSpan">{t("donateProcess.sixthP")}</div>
        <div className="introSpan">
          <span>{t("donateProcess.seventhP")}</span>
          <Link id="link" to="/contactus">
            {t("donateProcess.contact")}
          </Link>
        </div>
        <div className="introSpan">{t("donateProcess.eighthP")}</div>
      </div>
      <BottomNavBar />
      <div className="footer"></div>
    </ScreenContainer>
  );
};

export default DonateProcess;
