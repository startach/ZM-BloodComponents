import Stepper from "../basic/Stepper";
import Button, { ButtonVariant } from "../basicV2/Button";
import Text from "../basic/Text";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const useStyles = makeStyles({
  root: {
    flexDirection:"column",
    height:'100px'
  },
});

export interface WizardScreenProps {
  // step: number;
  // numberOfSteps: number;
  // handleNext?: () => void;
  // handleBack?: () => void;
  imageUrl: string[];
  title: string[];
  content: string[];

  // Stepper props:
  // currentStep: number;
  totalNumberOfSteps: number;
  // currentStep:number;

  // Action button
  buttonText: string;
  buttonVariant: ButtonVariant;

  onNext?: () => void;
  onPrev?: () => void;
  onClick: () => void;
}

export default function WizardScreen(props: WizardScreenProps) {
  
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () =>{
   setCurrentStep(currentStep+1);
  }
  return (
    <div>
      <img src={props.imageUrl[currentStep]} alt="image" />
      <Text className={styles.title}>{props.title[currentStep]}</Text>
      <div>{props.content[currentStep]}</div>
      <MobileStepper
      variant="dots"
      steps={props.totalNumberOfSteps}
      position="static"
      activeStep={currentStep}
      className={classes.root}
      // dir={"rtl"}
      nextButton={
        <Button
          title= "הבא"
          size="small"
          variant="outlined"
          onClick={onNext}
          disabled={currentStep === props.totalNumberOfSteps - 1}
        >
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
      {/* <Stepper
        step={props.stepNumber}
        numberOfSteps={props.totalNumberOfSteps}
        handleNext={props.onNext}
        handleBack={props.onPrev}
      />
      <Button
        onClick={nextStep}
        title={props.buttonText}
        variant={props.buttonVariant}
        isCentered={true}
      /> */}
    </div>
  );
}
