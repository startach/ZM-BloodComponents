import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from "@material-ui/core";

export type RadioOption = {
  value: any;
  label: string;
  isDisabled?: boolean;
};

type RadioGroupProps = {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  isDisabled?: boolean;
  className?: string;
  options: RadioOption[];
};

export default function RadioGroup({
  options,
  label,
  onChange,
  value,
  className,
}: RadioGroupProps) {
  return (
    <div>
      <FormLabel component="legend">{label}</FormLabel>
      <MaterialRadioGroup
        onChange={(e, newValue) => onChange(newValue)}
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
