import {
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from "@mui/material";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

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
  analytics: AnalyticsData<string | undefined>;
};

export default function RadioGroup({
  options,
  label,
  onChange,
  value,
  className,
  analytics,
}: RadioGroupProps) {
  const handleChange = (nextValue: string) => {
    onChange(
      options.find((option) => String(option.value) === nextValue)?.value!
    );

    if (!analytics) return;

    const { getAnalyticsValue, analyticsName } = analytics;

    const reportValue = getAnalyticsValue?.(value) ?? nextValue;

    reportClick(AnalyticsButtonType.Radio, analyticsName, reportValue);
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
