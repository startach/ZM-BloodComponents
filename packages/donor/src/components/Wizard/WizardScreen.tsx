import Button, { ButtonVariant } from "../basic/Button";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import ZMScreen from "../basic/ZMScreen";
import SwipeableViews from "react-swipeable-views";
import classNames from "classnames";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";

export interface WizardPage {
  imageUrl: string;
  title: string;
  content: {
    text: string;
    bold?: boolean;
    button?: { name: string; text: string; onClick: () => void };
  }[];
  buttonText: string;
  buttonVariant: ButtonVariant;
  analytics: AnalyticsData;
}

export interface WizardScreenProps {
  pages: WizardPage[];
  onFinish: () => void;
}

export default function WizardScreen({ pages, onFinish }: WizardScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = () => {
    if (currentStep < pages.length - 1) setCurrentStep(currentStep + 1);
    else onFinish();
  };

  const analyticsProp = pages[currentStep].analytics;

  return (
    <ZMScreen className={styles.container}>
      <SwipeableViews
        axis={"x-reverse"}
        index={currentStep}
        onChangeIndex={setCurrentStep}
        enableMouseEvents
      >
        {pages.map((page, index) => (
          <div key={page.title}>
            {Math.abs(currentStep - index) <= 2 ? <Page page={page} /> : null}
          </div>
        ))}
      </SwipeableViews>

      <Dots steps={pages.length} activeStep={currentStep} />

      <div className={styles.actionButton}>
        <Button
          analytics={
            analyticsProp && {
              ...analyticsProp,
              analyticsType: AnalyticsButtonType.Wizard,
            }
          }
          title={pages[currentStep].buttonText}
          variant={pages[currentStep].buttonVariant}
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
                  analytics={{
                    analyticsName: key.button.name,
                    analyticsType: AnalyticsButtonType.Wizard,
                  }}
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
