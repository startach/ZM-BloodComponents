import ResetPasswordScreen, {
  ResetPasswordScreenProps,
} from "./ResetPasswordScreen";
import { action } from "@storybook/addon-actions";
import { TestUtils } from "@zm-blood-components/common";
import { Story } from "@storybook/react";
import GroupsTable, {
  GroupTableProps,
} from "../../../../../coordinator/src/components/Table/GroupTable";
import { AppointmentSlot } from "../../../../../coordinator/src/utils/types";

export default {
  component: ResetPasswordScreen,
  title: "Screens/Authentication/Reset Password Screen",
  parameters: { layout: "fullscreen" },
};

const props = {
  goToSignIn: action("goToSignIn"),
};

const Template: Story<ResetPasswordScreenProps> = (args) => (
  <ResetPasswordScreen {...args} />
);

export const Success = Template.bind({});
Success.args = {
  ...props,
  onResetPassword: async (email: string, onSuccess: () => void) => {
    action("onResetPassword")();
    await TestUtils.wait(2000);
    onSuccess();
    return true;
  },
};

export const NoSuchEmail = Template.bind({});
NoSuchEmail.args = {
  ...props,
  onResetPassword: async (
    email: string,
    onSuccess: () => void,
    error: (error: string) => void
  ) => {
    action("onResetPassword")();
    await TestUtils.wait(2000);
    error("כתובת הדואר אינה תקינה");
    return false;
  },
};
