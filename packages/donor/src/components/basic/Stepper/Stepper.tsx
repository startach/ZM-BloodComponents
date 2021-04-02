import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

interface StepperProps {
  step: number;
  numberOfSteps: number;
  handleNext?: () => void;
  handleBack?: () => void;
}

export default function Stepper(props: StepperProps) {
  const classes = useStyles();

  return (
    <MobileStepper
      variant="dots"
      steps={props.numberOfSteps}
      position="static"
      activeStep={props.step}
      className={classes.root}
      dir={"rtl"}
      nextButton={
        <Button
          size="small"
          onClick={props.handleNext}
          disabled={props.step === props.numberOfSteps - 1}
        >
          <KeyboardArrowLeft />
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={props.handleBack}
          disabled={props.step === 0}
        >
          <KeyboardArrowRight />
        </Button>
      }
    />
  );
}
