import styles from "./styles.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import WhatsappIcon from "../../assets/icons/whatsapp-icon.svg";
import MailIcon from "../../assets/icons/mail.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import WebsiteIcon from "../../assets/icons/website.svg";
import YoutubeIcon from "../../assets/icons/youtube.svg";
import Illustration from "../../assets/images/Contact.svg";
import React, { ReactNode } from "react";
import classNames from "classnames";
import { LinkUtils } from "@zm-blood-components/common";
import AnchorTag from "../../components/basic/AnchorTag";

export default function ContactScreen() {
  return (
    <ZMScreen hasBackButton title="צור קשר">
      <div className={styles.imageContainer}>
        <img src={Illustration} alt={"logo"} className={styles.illustration} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>דרכים ליצירת קשר</div>
        <div>מוזמנים ליצור קשר בכל שאלה, בקשה או הערה</div>
        <div className={styles.contentContainer}>
          <IconedContent
            iconLocation={WebsiteIcon}
            alt={"website"}
            content={
              <LinkTo
                url={ZICHRON_URL}
                text={ZICHRON_URL_TEXT}
                className={styles.underline}
              />
            }
          />
          <IconedContent
            iconLocation={MailIcon}
            alt={"email"}
            content={<MailTo email={ZICHRON_EMAIL} text={ZICHRON_EMAIL} />}
          />
          <IconedContent
            iconLocation={WhatsappIcon}
            alt={"phone"}
            content={
              <WhatsApp
                link={LinkUtils.getWhatsAppLinkWithText("")}
                text={ZICHRON_PHONE_TEXT}
              />
            }
          />
          <IconedContent
            iconLocation={FacebookIcon}
            alt={"facebook"}
            content={
              <LinkTo
                url={ZICHRON_FACEBOOK_URL}
                text={"עקבו אחרינו בפייסבוק"}
              />
            }
          />
          <IconedContent
            iconLocation={InstagramIcon}
            alt={"instagram"}
            content={
              <LinkTo
                url={ZICHRON_INSTAGRAM_URL}
                text={"עקבו אחרינו באינסטגרם"}
              />
            }
          />
          <IconedContent
            iconLocation={YoutubeIcon}
            alt={"youtube"}
            content={
              <LinkTo url={ZICHRON_YOUTUBE_URL} text={"עקבו אחרינו ביוטיוב"} />
            }
          />
        </div>{" "}
      </div>
    </ZMScreen>
  );
}

const ZICHRON_URL = "https://www.zichron.org";
const ZICHRON_URL_TEXT = "zichron.org";
const ZICHRON_EMAIL = "dam@zichron.org";
const ZICHRON_PHONE_TEXT = "058-710-0571";
const ZICHRON_FACEBOOK_URL =
  "https://www.facebook.com/search/top?q=%D7%96%D7%9B%D7%A8%D7%95%D7%9F%20%D7%9E%D7%A0%D7%97%D7%9D%20zichron%20menachem";
const ZICHRON_INSTAGRAM_URL = "https://www.instagram.com/zichronmenachem/";
const ZICHRON_YOUTUBE_URL = "https://www.youtube.com/user/zichronmenachem";

type ContactLineProps = {
  content: ReactNode;
  iconLocation: string;
  alt: string;
};

const IconedContent: React.FC<ContactLineProps> = ({
  content,
  iconLocation,
  alt,
}) => {
  return (
    <div className={styles.contentLine}>
      <div className={styles.iconContainer}>
        <img src={iconLocation} alt={alt || "icon"} />
      </div>
      {content}
    </div>
  );
};

type ContactLinkProps = {
  url: string;
  text: string;
  className?: string;
};

const LinkTo: React.FC<ContactLinkProps> = ({ url, text, className }) => {
  return (
    <AnchorTag
      linkName="contact_link"
      className={classNames(styles.link, className)}
      href={url}
    >
      {text}
    </AnchorTag>
  );
};

type MailToProps = {
  email: string;
  text: string;
};

const MailTo: React.FC<MailToProps> = ({ email, text }) => {
  return (
    <AnchorTag
      linkName="mail_link"
      className={classNames(styles.link, styles.underline)}
      href={`mailto:${email}`}
    >
      {text}
    </AnchorTag>
  );
};

type WhatsAppProps = {
  link: string;
  text: string;
};

const WhatsApp: React.FC<WhatsAppProps> = ({ link, text }) => {
  return (
    <AnchorTag
      linkName="whats_app_link"
      className={classNames(styles.phonelink, styles.underline)}
      href={`${link}`}
    >
      {text}
    </AnchorTag>
  );
};
