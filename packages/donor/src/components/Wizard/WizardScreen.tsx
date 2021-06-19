import Button from "../basic/Button/ButtonV2";
import Text from "../basic/Text";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { BrowserRouter, Link } from "react-router-dom";
import { PropTypes } from "@material-ui/core";
import { ButtonVariant } from "../basic/Button";

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  dot: {
    margin: "8px",
  },

  dots: {
    margin: "30px 0",
  },

  dotActive: {
    backgroundColor: "#A2D45E",
  },
});

interface wizardPage {
  imageUrl: string;
  title: string;
  content: { text: string; bold: boolean; link?: string; linkText?: string }[];
  buttonText: string;
  buttonVariant: ButtonVariant;
  buttonColor: PropTypes.Color;
}
export interface WizardScreenProps {
  pages: wizardPage[];
  linkRow?: { text: string; linkText: string; link: string };
  onFinish: () => void;
}

export default function WizardScreen(props: WizardScreenProps) {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () => {
    if (currentStep < props.pages.length - 1) setCurrentStep(currentStep + 1);
    else props.onFinish();
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={props.pages[currentStep].imageUrl}
        alt=""
      />
      <Text className={styles.title}>{props.pages[currentStep].title}</Text>
      <div className={styles.content}>
        {props.pages[currentStep].content.map((key, index) => (
          <div>
            <Text
              key={index}
              className={key.link ? styles.textLink : ""}
              style={
                key.bold ? { fontWeight: "bold" } : { fontWeight: "normal" }
              }
            >
              {key.text}
              {key.link ? (
                <BrowserRouter>
                  <Link className={styles.link} to={key.link}>
                    {key.linkText}
                  </Link>
                </BrowserRouter>
              ) : null}
            </Text>
          </div>
        ))}
      </div>
      <MobileStepper
        variant="dots"
        steps={props.pages.length}
        position="static"
        activeStep={currentStep}
        classes={{
          root: classes.root,
          dot: classes.dot,
          dots: classes.dots,
          dotActive: classes.dotActive,
        }}
        nextButton={
          <Button
            color={props.pages[currentStep].buttonColor}
            title={props.pages[currentStep].buttonText}
            variant={props.pages[currentStep].buttonVariant}
            onClick={onNext}
          />
        }
        backButton={null}
      />
    </div>
  );
}
