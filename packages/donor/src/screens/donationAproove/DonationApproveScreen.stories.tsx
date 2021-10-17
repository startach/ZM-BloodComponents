import DonationApproveScreen from "./DonationApproveScreen";

export default {
  component: DonationApproveScreen,
  title: "Screens/About Screen",
  parameters: { layout: "fullscreen" },
};

export const Default = () => {
  <DonationApproveScreen
    firstName="משה"
    onShowOptionSelected={(isNoShow: boolean) => {}}
  />;
};
