import { KeyboardDatePicker } from "@material-ui/pickers";

export interface DatePickerProps {
  value: Date | null;
  label: string;
  onChange: (newDate: Date | null) => void;
  disablePast?: boolean;
  className?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DatePicker({
  value,
  label,
  onChange,
  disablePast,
  className,
  minimumDate,
  maximumDate,
}: DatePickerProps) {
  return (
    <KeyboardDatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy"
      disablePast={disablePast}
      className={className}
      minDate={minimumDate}
      maxDate={maximumDate}
    />
  );
}
