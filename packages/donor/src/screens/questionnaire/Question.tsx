import React from "react";
import styles from "./QuestionnaireScreen.module.scss";
import { SelectOption } from "@zm-blood-components/common";
import { PickerButton } from "../../components/basic/Picker/Picker";

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
  return (
    <div className={styles.question}>
      <div className={styles.questionLabel}>{props.label}</div>
      <div className={styles.questionButtons}>
        {props.options.map((option) => (
          <div className={styles.questionButton} key={option.key}>
            <PickerButton
              label={option.label}
              onClick={() => props.onChange(option.value)}
              selected={props.value === option.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
