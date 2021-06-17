import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { Story } from "@storybook/react";
import onboardingImg1 from "../../assets/icons/img-Onboarding-1.svg";
import onboardingImg2 from "../../assets/icons/img-Onboarding-2.svg";
import onboardingImg3 from "../../assets/icons/img-Onboarding-3.svg";
import onboardingImg4 from "../../assets/icons/img-Onboarding-4.svg";

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
      ],
      buttonText: "הבא",
      buttonVariant: "outlined",
      buttonColor: "secondaryGrey",
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
      buttonVariant: "outlined",
      buttonColor: "secondaryGrey",
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
      buttonVariant: "outlined",
      buttonColor: "secondaryGrey",
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
      buttonVariant: "contained",
      buttonColor: "main",
    },
  ],
  currentStep: 0,
  linkRow: { text: "כבר רשום כתורם?", linkText: "התחברות", link: "/" },
  callBack: () => {
    return;
  },
};

const Template: Story<WizardScreenProps> = (args: WizardScreenProps) => (
  <WizardScreen {...args} />
);

export const FirstStep = Template.bind({});
FirstStep.args = {
  ...baseArgs,
  // currentStep: 0,
  // onPrev: undefined,
};

export const MiddleStep = Template.bind({});
MiddleStep.args = baseArgs;

export const LastStep = Template.bind({});
LastStep.args = {
  ...baseArgs,
  currentStep: 1,
  // onNext: undefined,
  // buttonVariant: ButtonVariant.contained,
};
