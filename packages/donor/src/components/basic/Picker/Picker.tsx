import { SelectOption, AnalyticsButtonType } from "@zm-blood-components/common";
import styles from "./Picker.module.scss";
import classNames from "classnames";
import { reportClick } from "../../../Analytics";

export type PickerProps<T> = {
  /** For logging and Analytics */
  name: string;
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  buttonClassName?: string;
};

export default function Picker<T>({
  name,
  label,
  options,
  onChange,
  value,
  buttonClassName,
}: PickerProps<T>) {
  const handleClick = (option: SelectOption<T>) => {
    onChange(option!.value);
    reportClick(AnalyticsButtonType.Picker, name, `${option.value}`);
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
