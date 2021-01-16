import { MessengerContext, Props } from "bottender";
import MainFlow from "./MainFlow";

export enum OnboardingStep {
  WELCOME,
  HANDLE_PHONE,
  HANDLE_EMAIL,

  DONE,
}

export default async function Onboarding(
  context: MessengerContext,
  props: Props<MessengerContext>
) {
  let nextOnboardingStep = context.state.nextOnboardingStep as OnboardingStep;
  console.log("nextOnboardingStep", nextOnboardingStep);

  switch (nextOnboardingStep) {
    case OnboardingStep.WELCOME:
      return OnboardUser;
    case OnboardingStep.HANDLE_PHONE:
      return HandlePhone;
    case OnboardingStep.HANDLE_EMAIL:
      return CompleteOnboarding;
    case OnboardingStep.DONE:
    default:
      return props.next;
  }
}

async function OnboardUser(context: MessengerContext) {
  context.setState({
    nextOnboardingStep: OnboardingStep.HANDLE_PHONE,
  });
  const user = await context.getUserProfile();
  await context.sendText(
    `שלום ${user?.name}!
איזה כיף שבחרת להרשם כתורם!
נשמח לקבל כמה פרטים כדי שנוכל לשבץ אותך טוב יותר.
מה הטלפון שלך?`,
    {
      quickReplies: [
        {
          contentType: "user_phone_number",
        },
      ],
    }
  );
}

async function HandlePhone(context: MessengerContext) {
  const input = context.event.text;
  console.log("Input phone:", input);

  context.setState({
    nextOnboardingStep: OnboardingStep.HANDLE_EMAIL,
  });
  await context.sendText(`תודה, ומה האימייל?`, {
    quickReplies: [
      {
        contentType: "user_email",
      },
    ],
  });
}

async function CompleteOnboarding(context: MessengerContext) {
  const input = context.event.text;
  console.log("Input email:", input);

  context.setState({
    nextOnboardingStep: OnboardingStep.DONE,
  });
  await context.sendText(`סיימנו!`);

  return MainFlow;
}
