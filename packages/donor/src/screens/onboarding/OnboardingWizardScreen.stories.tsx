import { Story } from "@storybook/react";
import OnboardingWizardScreen, {
  OnboardingWizardScreenProps,
} from "./OnboardingWizardScreen";
import { action } from "@storybook/addon-actions";

export default {
  component: OnboardingWizardScreen,
  title: "Screens/Onboarding Wizard DontTest",
  parameters: { layout: "fullscreen" },
};

const props: OnboardingWizardScreenProps = {
  onFinish: action("onFinish"),
  goToLogin: action("goToLogin"),
};

const Template: Story<OnboardingWizardScreenProps> = (args) => (
  <OnboardingWizardScreen {...args} />
);

export const Default = Template.bind({});
Default.args = props;
