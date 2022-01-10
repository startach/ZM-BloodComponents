import { KeyboardTimePicker } from "@material-ui/pickers";
import styles from "./TimePicker.module.scss";
import clockIcon from "../../assets/icons/clock.svg";

export interface TimePickerProps {
  value: Date | null;
  label: string;
  onChange: (newDate: Date | null) => void;
  className?: string;
}

export default function TimePicker({
  value,
  label,
  onChange,
  className,
}: TimePickerProps) {
  const clockIconImage = (
    <img className={styles.clockIconContainer} src={clockIcon} alt="O" />
  );

  return (
    <KeyboardTimePicker
      keyboardIcon={clockIconImage}
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      minutesStep={5}
      className={className}
    />
  );
}
