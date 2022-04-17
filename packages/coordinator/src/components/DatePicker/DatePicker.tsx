import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

export interface DatePickerProps {
  value: Date | null;
  label: string;
  onChange: (newDate: Date | null) => void;
  disablePast?: boolean;
  className?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disableSaturday?: boolean;
}

export default function DatePicker({
  value,
  label,
  onChange,
  disablePast,
  className,
  minimumDate,
  maximumDate,
  disableSaturday,
}: DatePickerProps) {
  return (
    <MuiDatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputFormat="dd/MM/yyyy"
      disablePast={disablePast}
      className={className}
      minDate={minimumDate}
      maxDate={maximumDate}
      todayText={"היום"}
      showTodayButton
      shouldDisableDate={(x) =>
        x && disableSaturday ? x.getDay() === 6 : false
      }
      renderInput={(params) => <TextField variant="standard" {...params} />}
    />
  );
}
