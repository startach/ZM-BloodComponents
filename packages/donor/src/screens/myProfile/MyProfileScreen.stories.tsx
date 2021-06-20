import MyProfileScreen, { MyProfileScreenProps } from "./MyProfileScreen";
import { action } from "@storybook/addon-actions";
import { BloodType } from "@zm-blood-components/common";

export default {
  component: MyProfileScreen,
  title: "Screens/My Profile Screen",
  parameters: { layout: "fullscreen" },
};

const props: MyProfileScreenProps = {
  user: {
    id: "123",
    firstName: "משה",
    lastName: "כהן",
    email: "email",
    phone: "0521234567",
    bloodType: BloodType.A_MINUS,
    birthDate: "2020-01-14",
  },
  onSave: action("onSave"),
};

export const Default = (args: MyProfileScreenProps) => (
  <MyProfileScreen {...args} />
);
Default.args = props;
