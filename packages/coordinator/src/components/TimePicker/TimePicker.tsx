import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";

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
  return (
    <MuiTimePicker
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      minutesStep={5}
      className={className}
      okText={"אישור"}
      cancelText={"ביטול"}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  );
}
