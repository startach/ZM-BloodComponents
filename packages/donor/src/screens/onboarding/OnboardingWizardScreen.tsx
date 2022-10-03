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
          text: " העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
          bold: true,
        },
        {
          text: "כבר נרשמת?",
          bold: true,
          button: {
            name: "onboarding_go_to_login",
            onClick: props.goToLogin,
            text: "התחברות",
          },
        },
      ],
      analytics: {
        analyticsName: "onboarding_first_page",
        analyticsValue: "next",
      },
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
    },
    {
      imageUrl: onboardingImg2,
      title: "רגע, מה זה בכלל?",
      content: [
        {
          text: "טרומבוציטים (טסיות דם) הינם מרכיב בדם המהווה חלק מרכזי במנגנון הקרישה של הדם. בשונה מתרומת דם רגילה, בתרומה זו, האורכת כשעתיים, מסננים רק את הטסיות, ושאר הדם מוחזר לגוף.",
        },
      ],
      analytics: {
        analyticsName: "onboarding_second_page",
        analyticsValue: "next",
      },
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
    },
    {
      imageUrl: onboardingImg3,
      title: "למה זה חשוב?",
      content: [
        {
          text: "מנת טרומבוציטים טובה לחמישה ימים בלבד, ולכן קיים צורך תמידי בתרומות שוטפות.",
          bold: true,
        },
        {
          text: " באמצעות האפליקציה תוכלו לקבוע תורים בקלות ולפי זמינות התורים בבתי החולים.",
        },
      ],
      analytics: {
        analyticsName: "onboarding_third_page",
        analyticsValue: "next",
      },
      buttonText: "הבא",
      buttonVariant: ButtonVariant.outlined,
    },
    {
      imageUrl: onboardingImg4,
      title: "מי יכולים לתרום?",
      content: [
        {
          text: "כל מי שמעל גיל 17 ושעברו שאלון התאמה לתרומה בעת הרשמה לתור באפליקציה, יכולים לתרום ולהציל חיים כבר עכשיו!",
        },
        {
          text: "כבר נרשמת?",
          bold: true,
          button: {
            name: "onboarding_go_to_login",
            onClick: props.goToLogin,
            text: "התחברות",
          },
        },
      ],
      analytics: {
        analyticsName: "onboarding_fourth_page",
        analyticsValue: "next",
      },
      buttonText: "בואו נתחיל",
      buttonVariant: ButtonVariant.contained,
    },
  ];

  return <WizardScreen pages={onboardingScreens} onFinish={props.onFinish} />;
}
