import {
  NativeSelect,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

type SelectVariant = "standard" | "filled" | "outlined";

export interface SelectOption<T> {
  value: T;
  key: string;
  label: string;
}

type SelectProps<T> = {
  /** For logging and Analytics */
  analyticsName: string;
  getAnalyticsValue?: (optionValue: T | undefined) => string;
  id?: string;
  label?: string;
  onChange: (value: T) => void;
  value?: T;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  isValid?: boolean;
  variant?: SelectVariant;
  options: SelectOption<T>[];
  errorMessage?: string;
};

const useSelectStyles = makeStyles({
  root: {
    height: "3rem",
    marginBottom: "30px",
  },
});

export default function Select<T>({
  analyticsName,
  getAnalyticsValue,
  id,
  label,
  onChange,
  value,
  isDisabled,
  placeholder,
  className,
  isValid = true,
  variant = "standard",
  options,
  errorMessage,
}: SelectProps<T>) {
  const classes = useSelectStyles();

  const handleChange = (nextValue: string) => {
    onChange(
      options.find((option) => String(option.value) === nextValue)?.value!
    );

    const reportValue = getAnalyticsValue?.(value) ?? nextValue;

    reportClick(AnalyticsButtonType.Select, analyticsName, reportValue);
  };

  return (
    <FormControl error={!isValid} className={classes.root}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NativeSelect
        id={id}
        onChange={(e) => handleChange(e.target.value)}
        value={options.find((option) => option.value === value)?.key}
        disabled={isDisabled}
        placeholder={placeholder}
        className={className}
        error={!isValid}
        variant={variant}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
