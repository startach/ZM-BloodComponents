import {
  SelectOption,
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import styles from "./Picker.module.scss";
import classNames from "classnames";
import { reportClick } from "../../../Analytics";

export type PickerProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  buttonClassName?: string;
  analytics: AnalyticsData<T>;
};

export default function Picker<T>({
  label,
  options,
  onChange,
  value,
  buttonClassName,
  analytics,
}: PickerProps<T>) {
  const handleClick = (option: SelectOption<T>) => {
    onChange(option!.value);

    if (!analytics) return;

    const { getAnalyticsValue, analyticsName } = analytics;
    const value = getAnalyticsValue?.(option.value) ?? String(option.value);

    reportClick(AnalyticsButtonType.Picker, analyticsName, value);
  };

  return (
    <div>
      <div className={styles.pickerLabel}>{label}</div>
      <div className={styles.pickerButtons}>
        {options.map((option) => (
          <PickerButton
            key={option.key}
            label={option.label}
            onClick={() => handleClick(option)}
            selected={value === option.value}
            buttonClassName={buttonClassName}
          />
        ))}
      </div>
    </div>
  );
}

export function PickerButton(props: {
  label: string;
  onClick: () => void;
  selected: boolean;
  buttonClassName?: string;
}) {
  const buttonClassNames = [styles.pickerButton];
  if (props.buttonClassName) {
    buttonClassNames.push(props.buttonClassName);
  }
  if (props.selected) {
    buttonClassNames.push(styles.selectedButton);
  }

  return (
    <div className={styles.pickerButtonContainer}>
      <div
        onClick={props.onClick}
        color={props.selected ? "primary" : "default"}
        className={classNames(buttonClassNames)}
      >
        {props.label}
      </div>
    </div>
  );
}
