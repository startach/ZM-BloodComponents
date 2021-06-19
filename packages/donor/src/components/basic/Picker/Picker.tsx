import { SelectOption } from "@zm-blood-components/common";
import { ButtonVariant } from "../Button";
import styles from "./Picker.module.scss";
import Button from "../Button";
import classNames from "classnames";

export type PickerProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  buttonClassName?: string;
};

export default function Picker<T>({
  label,
  options,
  onChange,
  value,
  buttonClassName,
}: PickerProps<T>) {
  return (
    <div>
      <div className={styles.pickerLabel}>{label}</div>
      <div className={styles.pickerButtons}>
        {options.map((option) => (
          <div className={styles.pickerButtonContainer}>
            <Button
              title={option.label}
              onClick={() => onChange(option!.value)}
              variant={ButtonVariant.outlined}
              color={value === option.value ? "secondary" : "default"}
              className={classNames(styles.pickerButton, buttonClassName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
