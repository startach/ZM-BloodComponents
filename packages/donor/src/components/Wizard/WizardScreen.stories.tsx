import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { ButtonVariant } from "../basic/Button";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import onboardingImg1 from "../../assets/icons/img-Onboarding-1.svg"
import onboardingImg2 from "../../assets/icons/img-Onboarding-2.svg"
import onboardingImg3 from "../../assets/icons/img-Onboarding-3.svg"
import onboardingImg4 from "../../assets/icons/img-Onboarding-4.svg"

export default {
  component: WizardScreen,
  title: "Components V2/Wizard Screen",
};

const baseArgs: WizardScreenProps = {
  imageUrl:[onboardingImg1,onboardingImg2,onboardingImg3,onboardingImg4],
  title: ["איזה כיף שבאת!","איזה כיף שבאת!","איזה כיף שבאת!","איזה כיף שבאת!"],
  content:['sdfsf','dfddf','sdss','sds'],
  currentStep: 1,
  totalNumberOfSteps: 4,
  buttonText: "הבא",
  buttonVariant: ButtonVariant.outlined,

  onNext: action("onNext"),
  onPrev: action("onPrev"),
  onClick: action("onClick"),
};

const Template: Story<WizardScreenProps> = (args: WizardScreenProps) => (
  <WizardScreen {...args} />
);

export const FirstStep = Template.bind({});
FirstStep.args = {
  ...baseArgs,
  currentStep: 0,
  onPrev: undefined,
};

export const MiddleStep = Template.bind({});
MiddleStep.args = baseArgs;

export const LastStep = Template.bind({});
LastStep.args = {
  ...baseArgs,
  currentStep: 3,
  onNext: undefined,
  buttonVariant: ButtonVariant.contained,
};
