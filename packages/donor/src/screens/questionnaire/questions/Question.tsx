import React from "react";
import styles from "./Question.module.scss";
import { AnalyticsButtonType, SelectOption } from "@zm-blood-components/common";
import { PickerButton } from "../../../components/basic/Picker/Picker";
import { reportClick } from "../../../Analytics";

export interface QuestionProps<T> {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
}

export const YesNoOptions: SelectOption<boolean>[] = [
  { value: true, label: "כן", key: "כן" },
  { value: false, label: "לא", key: "לא" },
];

export const YesNoNotRelevantOptions: SelectOption<string>[] = [
  { value: "yes", label: "כן", key: "כן" },
  { value: "no", label: "לא", key: "לא" },
  { value: "not-relevant", label: "לא רלוונטי", key: "לא רלוונטי" },
];

export function Question<T>(props: QuestionProps<T>) {
  //// TODO Should Questions have names?
  const handleClick = (option: SelectOption<T>) => {
    props.onChange(option.value);
    reportClick(
      AnalyticsButtonType.Question,
      props.label || "",
      `${option.value}`
    );
  };

  return (
    <div className={styles.question}>
      <div className={styles.questionLabel}>{props.label}</div>
      <div className={styles.questionButtons}>
        {props.options.map((option) => (
          <div className={styles.questionButton} key={option.key}>
            <PickerButton
              label={option.label}
              onClick={() => handleClick(option)}
              selected={props.value === option.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
