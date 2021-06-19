import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { Story } from "@storybook/react";
import onboardingImg1 from "../../assets/icons/img-Onboarding-1.svg";
import onboardingImg2 from "../../assets/icons/img-Onboarding-2.svg";
import onboardingImg3 from "../../assets/icons/img-Onboarding-3.svg";
import onboardingImg4 from "../../assets/icons/img-Onboarding-4.svg";
import { ButtonVariant } from "../basic/Button";
import { action } from "@storybook/addon-actions";

export default {
  component: WizardScreen,
  title: "Components V2/Wizard Screen",
};

const baseArgs: WizardScreenProps = {
  pages: [
    {
      imageUrl: onboardingImg1,
      title: "איזה כיף שבאת!",
      content: [
        {
          text: "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים",
          bold: false,
        },
        {
          text: " העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
          bold: true,
        },
        { text: "כבר רשום כתורם?", bold: true, link: "/", linkText: "התחברות" },
      ],
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
      buttonColor: "default",
    },
    {
      imageUrl: onboardingImg2,
      title: "רגע, מה זה בכלל?",
      content: [
        {
          text: "טרומבוציטים (טסיות דם) הינם מרכיב בדם המהווה חלק מרכזי במנגנון הקרישה של הדם. בשונה מתרומת דם רגילה, בתרומה זו, האורכת כשעתיים, מסננים רק את הטסיות, ושאר הדם מוחזר לגוף.",
          bold: false,
        },
        { text: "", bold: false },
      ],
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
      buttonColor: "default",
    },
    {
      imageUrl: onboardingImg3,
      title: "רגע, מה זה בכלל? 2",
      content: [
        {
          text: "מנת טרומבוציטים טובה לחמישה ימים בלבד, ולכן הצורך התמידי בתרומות שוטפות.",
          bold: true,
        },
        {
          text: " באמצעות האפליקציה תוכלו לקבוע תורים בקלות ולפי זמינות התורים בבתי החולים",
          bold: false,
        },
      ],
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
      buttonColor: "default",
    },
    {
      imageUrl: onboardingImg4,
      title: "מי יכולים לתרום?",
      content: [
        {
          text: "כל מי שמעל גיל 17 ושעברו שאלון התאמה לתרומה בעת הרשמה לתור באפליקציה,",
          bold: false,
        },
        { text: " יכולים לתרום ולהציל חיים כבר עכשיו!", bold: false },
      ],
      buttonText: "בואו נתחיל",
      buttonVariant: ButtonVariant.contained,
      buttonColor: "primary",
    },
  ],

  onFinish: action("Callback"),
};

const Template: Story<WizardScreenProps> = (args: WizardScreenProps) => (
  <WizardScreen {...args} />
);

export const Wizard = Template.bind({});
Wizard.args = {
  ...baseArgs,
};
