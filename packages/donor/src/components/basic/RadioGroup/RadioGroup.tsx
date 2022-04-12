import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from "@material-ui/core";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

export type RadioOption<T> = {
  value: any;
  label: string;
  isDisabled?: boolean;
  key: string;
};

type RadioGroupProps<T> = {
  /** For logging and Analytics */
  analyticsName: string;
  getAnalyticsValue?: (optionValue: T | undefined) => string;
  label?: string;
  onChange: (value: T) => void;
  value: T;
  isDisabled?: boolean;
  className?: string;
  options: RadioOption<T>[];
};

export default function RadioGroup<T>({
  analyticsName: name,
  getAnalyticsValue,
  options,
  label,
  onChange,
  value,
  className,
}: RadioGroupProps<T>) {
  const handleChange = (nextValue: string) => {
    onChange(
      options.find((option) => String(option.value) === nextValue)?.value!
    );

    const reportValue = getAnalyticsValue?.(value) ?? nextValue;

    reportClick(AnalyticsButtonType.Radio, name, reportValue);
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
