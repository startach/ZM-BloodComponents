import { SelectOption } from "@zm-blood-components/common";
import { ButtonVariant } from "../Button";
import styles from "./Picker.module.scss";
import Button from "../Button";

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
          <OptionButton
            value={value}
            onChange={onChange}
            option={option}
            key={option.key}
            buttonClassName={buttonClassName}
          />
        ))}
      </div>
    </div>
  );
}

function OptionButton<T>(props: {
  value?: T;
  onChange: (value: T) => void;
  option: SelectOption<T> | null;
  buttonClassName?: string;
}) {
  if (props.option === null) {
    return <div className={styles.pickerButton} />;
  }

  return (
    <div className={styles.pickerButton}>
      <Button
        title={props.option.label}
        onClick={() => props.onChange(props.option!.value)}
        variant={ButtonVariant.outlined}
        color={props.value === props.option.value ? "secondary" : "default"}
        className={props.buttonClassName}
      />
    </div>
  );
}
