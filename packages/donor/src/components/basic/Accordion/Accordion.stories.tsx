import { Meta } from "@storybook/react";
import Accordion from "./Accordion";

export default {
  component: Accordion,
  title: "Components/Accordion",
  parameters: { layout: "padded" },
} as Meta;

export const Default = () => {
  // const [checked, setChecked] = useState(false); => TODO: Analytics

  const questionsAnswerMock = [
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
      link: "www.google.com",
    },
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
    },
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
      link: "www.google.com",
    },
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
    },
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
      link: "www.google.com",
    },
    {
      description:
        "ולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידוםר",
    },
  ];

  return <Accordion accordionPanels={questionsAnswerMock} />;
};
