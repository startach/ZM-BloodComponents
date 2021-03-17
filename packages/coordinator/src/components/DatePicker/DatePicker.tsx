import { KeyboardDatePicker } from "@material-ui/pickers";

interface DatePickerProps {
  value: Date | null;
  label: string;
  onChange: (newDate: Date | null) => void;
  disablePast?: boolean;
  className?: string;
}

export default function DatePicker({
  value,
  label,
  onChange,
  disablePast,
  className,
}: DatePickerProps) {
  return (
    <KeyboardDatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy"
      disablePast={disablePast}
      className={className}
    />
  );
}
