import WizardScreen, { WizardScreenProps } from "./WizardScreen";
import { ButtonVariant } from "../basic/Button";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  component: WizardScreen,
  title: "Components V2/Wizard Screen",
};

const baseArgs: WizardScreenProps = {
  imageUrl:
    "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  title: "איזה כיף שבאת!",
  content:
    "אפליקציה זו מיועדת עבור תורמי הטרומבוציטים של זכרון מנחם המגיעים העוזרים להציל חיים של ילדים חולי סרטן, וחולים במחלות קשות נוספות!",
  currentStep: 2,
  totalNumberOfSteps: 4,
  buttonText: "אישור והמשך",
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
