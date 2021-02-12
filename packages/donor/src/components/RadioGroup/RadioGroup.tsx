import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

type RadioOption = {
  value: any;
  label: string;
  isDisabled?: boolean;
};

type SelectProps = {
  label?: string;
  onChange: (event: any, value: string) => void;
  value: string;
  name: string;
  isDisabled?: boolean;
  className?: string;
  options: RadioOption[];
};

export default function ZMRadio({
  options,
  label,
  onChange,
  value,
  name,
  className,
}: SelectProps) {
  return (
    <div>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...{ name, className, value, onChange }}>
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio disabled={option.isDisabled} color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
