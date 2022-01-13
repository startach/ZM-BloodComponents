import { KeyboardTimePicker } from "@material-ui/pickers";

import { AccessAlarm } from "@material-ui/icons";
import { SvgIcon } from "@material-ui/core";

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
    <KeyboardTimePicker
      keyboardIcon={<SvgIcon component={AccessAlarm} />}
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      minutesStep={5}
      className={className}
    />
  );
}
