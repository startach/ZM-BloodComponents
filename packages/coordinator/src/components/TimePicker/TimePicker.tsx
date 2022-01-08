import { KeyboardTimePicker } from "@material-ui/pickers";

interface TimePickerProps {
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
  return (
    <KeyboardTimePicker
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      minutesStep={5}
      className={className}
    />
  );
}
