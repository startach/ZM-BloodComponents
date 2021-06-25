import Button, { ButtonVariant } from "../basic/Button";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import { PropTypes } from "@material-ui/core";
import ZMScreen from "../basic/ZMScreen";

interface WizardPage {
  imageUrl: string;
  title: string;
  content: {
    text: string;
    bold?: boolean;
    button?: { text: string; onClick: () => void };
  }[];
  buttonText: string;
  buttonVariant: ButtonVariant;
  buttonColor: PropTypes.Color;
}

export interface WizardScreenProps {
  pages: WizardPage[];
  onFinish: () => void;
}

export default function WizardScreen(props: WizardScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () => {
    if (currentStep < props.pages.length - 1) setCurrentStep(currentStep + 1);
    else props.onFinish();
  };
  return (
    <ZMScreen className={styles.container}>
      <img
        className={styles.image}
        src={props.pages[currentStep].imageUrl}
        alt=""
      />
      <div className={styles.title}>{props.pages[currentStep].title}</div>
      <div className={styles.content}>
        {props.pages[currentStep].content.map((key, index) => (
          <div key={key.text + index}>
            <div
              className={key.button ? styles.buttonText : ""}
              style={
                key.bold ? { fontWeight: "bold" } : { fontWeight: "normal" }
              }
            >
              {key.text}

              {key.button && (
                <Button
                  title={key.button.text}
                  onClick={key.button.onClick}
                  variant={ButtonVariant.text}
                  className={styles.button}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <MobileStepper
        variant="dots"
        steps={props.pages.length}
        position="static"
        activeStep={currentStep}
        classes={{
          root: styles.stepper,
          dot: styles.dot,
          dots: styles.dots,
          dotActive: styles.dotActive,
        }}
        nextButton={null}
        backButton={null}
      />

      <Button
        color={props.pages[currentStep].buttonColor}
        title={props.pages[currentStep].buttonText}
        variant={props.pages[currentStep].buttonVariant}
        onClick={onNext}
      />
    </ZMScreen>
  );
}
