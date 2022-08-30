import styles from "./Question.module.scss";
import {
  AnalyticsButtonType,
  AnalyticsData,
  SelectOption,
} from "@zm-blood-components/common";
import { PickerButton } from "../../../components/basic/Picker/Picker";
import { reportClick } from "../../../Analytics";

export type QuestionProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  analytics: AnalyticsData<T>;
};

export const YesNoOptions: SelectOption<boolean>[] = [
  { value: true, label: "כן", key: "כן" },
  { value: false, label: "לא", key: "לא" },
];

export const YesNoNotRelevantOptions: SelectOption<string>[] = [
  { value: "yes", label: "כן", key: "כן" },
  { value: "no", label: "לא", key: "לא" },
  { value: "not-relevant", label: "לא רלוונטי", key: "לא רלוונטי" },
];

export function Question<T>({
  onChange,
  options,
  label,
  value,
  analytics,
}: QuestionProps<T>) {
  const handleClick = (option: SelectOption<T>) => {
    onChange(option.value);

    if (!analytics) return;

    reportClick(
      AnalyticsButtonType.Question,
      analytics.analyticsName,
      String(option.value)
    );
  };

  return (
    <div className={styles.question}>
      <div className={styles.questionLabel}>{label}</div>
      <div className={styles.questionButtons}>
        {options.map((option) => (
          <div className={styles.questionButton} key={option.key}>
            <PickerButton
              label={option.label}
              onClick={() => handleClick(option)}
              selected={value === option.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
