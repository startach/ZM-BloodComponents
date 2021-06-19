import { Hospital } from "@zm-blood-components/common";
import QuestionnaireScreen, {
  QuestionnaireScreenProps,
} from "./QuestionnaireScreen";
import { action } from "@storybook/addon-actions";

export default {
  component: QuestionnaireScreen,
  title: "Screens/Questionnaire",
  parameters: { layout: "fullscreen" },
};

const props: QuestionnaireScreenProps = {
  bookableAppointment: {
    hospital: Hospital.BEILINSON,
    appointmentIds: ["AppointmentId1", "AppointmentId2"],
    donationStartTimeMillis: 1628845200000,
  },
  onSuccess: action("onSuccess"),
  goToHomePage: async () => action("goToHomePage")(),
  isLoading: false,
  debugMode: false,
};

export const Default = () => <QuestionnaireScreen {...props} />;
