import onboardingImg1 from "../../assets/icons/img-Onboarding-1.svg";
import onboardingImg2 from "../../assets/icons/img-Onboarding-2.svg";
import onboardingImg3 from "../../assets/icons/img-Onboarding-3.svg";
import onboardingImg4 from "../../assets/icons/img-Onboarding-4.svg";
import WizardScreen, { WizardPage } from "../../components/Wizard/WizardScreen";
import { ButtonVariant } from "../../components/basic/Button";

export interface OnboardingWizardScreenProps {
  goToLogin: () => void;
  onFinish: () => void;
}

export default function OnboardingWizardScreen(
  props: OnboardingWizardScreenProps
) {
  const onboardingScreens: WizardPage[] = [
    {
      imageUrl: onboardingImg1,
      title: "איזה כיף שבאת!",
      content: [
        {
          text: "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם",
        },
        {
          text:
            " העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
          bold: true,
        },
        {
          text: "כבר נרשמת?",
          bold: true,
          button: {
            onClick: props.goToLogin,
            text: "התחברות",
          },
        },
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
          text:
            "טרומבוציטים (טסיות דם) הינם מרכיב בדם המהווה חלק מרכזי במנגנון הקרישה של הדם. בשונה מתרומת דם רגילה, בתרומה זו, האורכת כשעתיים, מסננים רק את הטסיות, ושאר הדם מוחזר לגוף.",
        },
      ],
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
      buttonColor: "default",
    },
    {
      imageUrl: onboardingImg3,
      title: "למה זה חשוב?",
      content: [
        {
          text:
            "מנת טרומבוציטים טובה לחמישה ימים בלבד, ולכן קיים צורך תמידי בתרומות שוטפות.",
          bold: true,
        },
        {
          text:
            " באמצעות האפליקציה תוכלו לקבוע תורים בקלות ולפי זמינות התורים בבתי החולים.",
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
          text:
            "כל מי שמעל גיל 17 ושעברו שאלון התאמה לתרומה בעת הרשמה לתור באפליקציה, יכולים לתרום ולהציל חיים כבר עכשיו!",
        },
        {
          text: "כבר נרשמת?",
          bold: true,
          button: {
            onClick: props.goToLogin,
            text: "התחברות",
          },
        },
      ],
      buttonText: "בואו נתחיל",
      buttonVariant: ButtonVariant.contained,
      buttonColor: "primary",
    },
  ];

  return <WizardScreen pages={onboardingScreens} onFinish={props.onFinish} />;
}
