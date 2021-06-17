import MobileStepper from "@material-ui/core/MobileStepper";

interface StepperProps {
  step: number;
  numberOfSteps: number;
  handleNext: () => void;
  handleBack?: () => void;
}

export default function Stepper(props: StepperProps) {
  return (
    <MobileStepper
      variant="dots"
      steps={props.numberOfSteps}
      position="static"
      activeStep={props.step}
      dir={"rtl"}
      nextButton={null}
      backButton={null}
    />
  );
}
