import Button from "../basicV2/Button";
import Text from "../basic/Text";
import styles from "./WizardScreen.module.scss";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { BrowserRouter, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    fontFamily: "Rubik",
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

interface page {
  imageUrl: string;
  title: string;
  content: { text: string; bold: boolean }[];
  buttonText: string;
  buttonVariant: string;
  buttonColor: string;
}
export interface WizardScreenProps {
  pages: Array<page>;
  currentStep: number;
  linkRow?: { text: string; linkText: string; link: string };
  callBack: () => void;
}

export default function WizardScreen(props: WizardScreenProps) {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(props.currentStep);
  const onNext = () => {
    if (currentStep < props.pages.length - 1) setCurrentStep(currentStep + 1);
    else props.callBack();
  };
  return (
    <div>
      <img src={props.pages[currentStep].imageUrl} alt="" />
      <Text className={styles.title}>{props.pages[currentStep].title}</Text>
      <div className={styles.content}>
        {props.pages[currentStep].content.map((key, index) => (
          <div>
            <Text
              key={index}
              style={
                key.bold ? { fontWeight: "bold" } : { fontWeight: "normal" }
              }
            >
              {key.text}
            </Text>
          </div>
        ))}
        {currentStep === 0 && props.linkRow ? (
          <Text className={styles.textLink}>
            {props.linkRow.text}{" "}
            <BrowserRouter>
              <Link className={styles.link} to={props.linkRow.link}>
                {props.linkRow.linkText}
              </Link>
            </BrowserRouter>
          </Text>
        ) : null}
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
