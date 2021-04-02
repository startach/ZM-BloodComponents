import Stepper from "../basic/Stepper";
import Button, { ButtonVariant } from "../basic/Button";

export interface WizardScreenProps {
  imageUrl: string;
  title: string;
  content: string;

  // Stepper props:
  currentStep: number;
  totalNumberOfSteps: number;

  // Action button
  buttonText: string;
  buttonVariant: ButtonVariant;

  onNext?: () => void;
  onPrev?: () => void;
  onClick: () => void;
}

export default function WizardScreen(props: WizardScreenProps) {
  return (
    <div>
      <img src={props.imageUrl} alt="image" />
      <div>{props.title}</div>
      <div>{props.content}</div>
      <Stepper
        step={props.currentStep}
        numberOfSteps={props.totalNumberOfSteps}
        handleNext={props.onNext}
        handleBack={props.onPrev}
      />
      <Button
        onClick={props.onClick}
        title={props.buttonText}
        variant={props.buttonVariant}
        isCentered={true}
      />
    </div>
  );
}
