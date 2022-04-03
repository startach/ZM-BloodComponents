import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from "@material-ui/core";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

export type RadioOption = {
  value: any;
  label: string;
  isDisabled?: boolean;
};

type RadioGroupProps = {
  /** For logging and Analytics */
  name: string;
  label?: string;
  onChange: (value: string) => void;
  value: string;
  isDisabled?: boolean;
  className?: string;
  options: RadioOption[];
};

export default function RadioGroup({
  name,
  options,
  label,
  onChange,
  value,
  className,
}: RadioGroupProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue);

    reportClick(AnalyticsButtonType.Radio, name, newValue);
  };

  return (
    <div>
      <FormLabel component="legend">{label}</FormLabel>
      <MaterialRadioGroup
        onChange={(e, newValue) => handleChange(newValue)}
        {...{ className, value }}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio disabled={option.isDisabled} color="primary" />}
            label={option.label}
            key={option.label + option.value}
          />
        ))}
      </MaterialRadioGroup>
    </div>
  );
}
