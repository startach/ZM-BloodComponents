import { KeyboardDatePicker } from "@material-ui/pickers";

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
    <KeyboardDatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="dd/MM/yyyy"
      disablePast={disablePast}
      className={className}
      minDate={minimumDate}
      maxDate={maximumDate}
      minDateMessage={"תאריך לא תקין"}
      maxDateMessage={"תאריך לא תקין"}
      okLabel={"אישור"}
      cancelLabel={"ביטול"}
      todayLabel={"היום"}
      showTodayButton
      autoOk
      shouldDisableDate={(x) =>
        x && disableSaturday ? x.getDay() === 6 : false
      }
    />
  );
}
