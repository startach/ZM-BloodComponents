import Button, { ButtonVariant } from "../basic/Button";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import { PropTypes } from "@material-ui/core";
import ZMScreen from "../basic/ZMScreen";
import SwipeableViews from "react-swipeable-views";
import classNames from "classnames";
import { AnalyticsButtonType } from "@zm-blood-components/common";

export interface WizardPage {
  imageUrl: string;
  title: string;
  content: {
    text: string;
    bold?: boolean;
    button?: { name: string; text: string; onClick: () => void };
  }[];
  /** For logging and Analytics */
  buttonName: string;
  buttonValue: string;
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
      <SwipeableViews
        axis={"x-reverse"}
        index={currentStep}
        onChangeIndex={setCurrentStep}
        enableMouseEvents
      >
        {props.pages.map((page, index) => (
          <div key={page.title}>
            {Math.abs(currentStep - index) <= 2 ? <Page page={page} /> : null}
          </div>
        ))}
      </SwipeableViews>

      <Dots steps={props.pages.length} activeStep={currentStep} />

      <div className={styles.actionButton}>
        <Button
          analyticsType={AnalyticsButtonType.Wizard}
          analyticsName={props.pages[currentStep].buttonName}
          analyticsValue={props.pages[currentStep].buttonValue}
          color={props.pages[currentStep].buttonColor}
          title={props.pages[currentStep].buttonText}
          variant={props.pages[currentStep].buttonVariant}
          onClick={onNext}
        />
      </div>
    </ZMScreen>
  );
}

function Page(props: { page: WizardPage }) {
  const page = props.page;
  return (
    <div className={styles.content}>
      <img className={styles.image} src={page.imageUrl} alt="" />
      <div className={styles.title}>{page.title}</div>
      <div className={styles.pageText}>
        {page.content.map((key, index) => (
          <div key={key.text + index}>
            <div
              className={key.button ? styles.buttonText : ""}
              style={key.bold ? { fontWeight: 500 } : { fontWeight: "normal" }}
            >
              {key.text}

              {key.button && (
                <Button
                  analyticsType={AnalyticsButtonType.Wizard}
                  analyticsName={key.button.name}
                  title={key.button.text}
                  onClick={key.button.onClick}
                  variant={ButtonVariant.text}
                  className={styles.textButton}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dots(props: { steps: number; activeStep: number }) {
  const values: boolean[] = Array(props.steps).fill(false);
  values[props.activeStep] = true;

  return (
    <div className={styles.dots}>
      {values.map((value, index) => {
        const classes = [styles.dot];
        if (value) {
          classes.push(styles.dotActive);
        }
        return <div className={classNames(classes)} key={"" + value + index} />;
      })}
    </div>
  );
}
