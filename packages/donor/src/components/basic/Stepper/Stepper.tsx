import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button, { ButtonVariant } from "../../basicV2/Button";


const useStyles = makeStyles({
  root: {
    flexDirection:"column",
    height:'100px'
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
      // dir={"rtl"}
      nextButton={
        <Button
          size="small"
          variant="outlined"
          onClick={props.handleNext}
          disabled={props.step === props.numberOfSteps - 1}
        >
          {/* <KeyboardArrowLeft /> */}
        </Button>
      }
      backButton={
        null
        // <Button
        //   size="small"
        //   onClick={props.handleBack}
        //   disabled={props.step === 0}
        // >
        //   {/* <KeyboardArrowRight /> */}
        // </Button>
      }
    />
  );
}
