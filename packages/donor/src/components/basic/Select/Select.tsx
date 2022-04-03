import {
  NativeSelect,
  InputLabel,
  FormHelperText,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

type SelectVariant = "standard" | "filled" | "outlined";

export interface SelectOption<T> {
  value: T;
  key: string;
  label: string;
}

type SelectProps<T> = {
  name: string;
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
  name,
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

  const handleChange = (value: string) => {
    onChange(options.find((option) => option.key === value)?.value!);

    reportClick(AnalyticsButtonType.Select, name, value);
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
