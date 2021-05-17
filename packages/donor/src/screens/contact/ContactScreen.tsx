import Text from "../../components/basic/Text";
import HeaderSection from "../../components/HeaderSection";
import styles from "./styles.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";

import PhoneIcon from "../../assets/icons/phone.svg";
import MailIcon from "../../assets/icons/mail.svg";

import React, { ReactNode } from "react";

export default function ContactScreen() {
  return (
    <ZMScreen hasBackButton title="צור קשר">
      <Header />
      <ContactContent />
    </ZMScreen>
  );
}

const Header = () => {
  return (
    <HeaderSection className={styles.component}>
      <Text className={styles.textBold}>להלן דרכי ההתקשרות עמנו</Text>
      <Text>מוזמנים ליצור קשר בכל שאלה, בקשה או הערה</Text>
    </HeaderSection>
  );
};

const ZICHRON_URL = "https://www.zichron.org";
const ZICHRON_EMAIL = "dam@zichron.org";
const ZICHRON_PHONE = "+972-58-710-0571";
const ZICHRON_PHONE_TEXT = "058-710-0571";
const ZICHRON_FACEBOOK_URL =
  "https://www.facebook.com/search/top?q=%D7%96%D7%9B%D7%A8%D7%95%D7%9F%20%D7%9E%D7%A0%D7%97%D7%9D%20zichron%20menachem";
const ZICHRON_INSTAGRAM_URL = "https://www.instagram.com/zichronmenachem/";
const ZICHRON_YOUTUBE_URL = "https://www.youtube.com/user/zichronmenachem";

const ContactContent = () => {
  return (
    <div className={styles.contentContainer}>
      <IconedContent
        iconLocation={PhoneIcon}
        alt={"website"}
        content={<LinkTo url={ZICHRON_URL} text={ZICHRON_URL} />}
      />
      <IconedContent
        iconLocation={MailIcon}
        alt={"email"}
        content={<MailTo email={ZICHRON_EMAIL} text={ZICHRON_EMAIL} />}
      />
      <IconedContent
        iconLocation={PhoneIcon}
        alt={"phone"}
        content={
          <CallTo phoneNumber={ZICHRON_PHONE} text={ZICHRON_PHONE_TEXT} />
        }
      />
      <IconedContent
        iconLocation={PhoneIcon}
        alt={"facebook"}
        content={
          <LinkTo url={ZICHRON_FACEBOOK_URL} text={"תעקבו אחרינו בפייסבוק"} />
        }
      />
      <IconedContent
        iconLocation={PhoneIcon}
        alt={"instagram"}
        content={
          <LinkTo url={ZICHRON_INSTAGRAM_URL} text={"תעקבו אחרינו באינסטגרם"} />
        }
      />
      <IconedContent
        iconLocation={PhoneIcon}
        alt={"youtube"}
        content={
          <LinkTo url={ZICHRON_YOUTUBE_URL} text={"תעקבו אחרינו ביוטיוב"} />
        }
      />
    </div>
  );
};

type ContactLineProps = {
  content: ReactNode;
  iconLocation: string;
  alt?: string;
};

const IconedContent: React.FC<ContactLineProps> = ({
  content,
  iconLocation,
  alt = "",
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
};

const LinkTo: React.FC<ContactLinkProps> = ({ url, text }) => {
  return (
    <a className={styles.link} href={url}>
      {text}
    </a>
  );
};

type MailToProps = {
  email: string;
  text: string;
};

const MailTo: React.FC<MailToProps> = ({ email, text }) => {
  return (
    <a className={styles.link} href={`mailto:${email}`}>
      {text}
    </a>
  );
};

type CallToProps = {
  phoneNumber: string;
  text: string;
};

const CallTo: React.FC<CallToProps> = ({ phoneNumber, text }) => {
  return (
    <a className={styles.phonelink} href={`tel:${phoneNumber}`}>
      {text}
    </a>
  );
};
