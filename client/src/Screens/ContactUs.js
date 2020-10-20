import React from "react";

import ScreenContainer from "../components/screen";
import MenuHeader from "../components/MenuHeader";
import BottomNavBar from "../components/BottomNavBar/BottomBar";
import { useTranslation } from "react-i18next";
import "../components/Dashboard/dashboard.css";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <MenuHeader title={t("screens.contact")} icon="burger" />
      <div className="introContainer infoPagesAlign">
        <div className="introSpan">{t("contactUs.title")}</div>
        <div className="introSpan">{t("contactUs.firstP")}</div>
        <div className="introSpan">{t("contactUs.coordinatorDetails")}</div>
        <div className="introSpan">
          {t("contactUs.site")}:
          <span>
            <a href="https://zichron.org"> https://zichron.org</a>
          </span>
        </div>
        <div className="introSpan">
          {t("registerForm.email")}:
          <span>
            <a href="mailto:dam@zichron.org"> dam@zichron.org</a>
          </span>
        </div>
        <div className="introSpan">
          {t("registerForm.contactNumber")}:
          <span>
            <a href="tel:058-710-0571"> 058-710-0571</a>
          </span>
        </div>
        <div className="introSpan">{t("contactUs.secondP")}</div>
      </div>
      <BottomNavBar />
      <div className="footer"></div>
    </ScreenContainer>
  );
};

export default ContactUs;
