import {
  MenuItem,
  Select as MUSelect,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { SelectOption } from "@zm-blood-components/common";
import styles from "./Select.module.scss";

type SelectVariant = "standard" | "filled" | "outlined";

type SelectProps<T> = {
  id: string;
  label?: string;
  onChange: (value: T) => void;
  value?: T;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  isValid?: boolean;
  variant?: SelectVariant;
  options: SelectOption<T>[];
};

export default function Select<T>({
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
}: SelectProps<T>) {
  return (
    <FormControl>
      <InputLabel className={styles.label} id={`${id}_label`}>
        {label}
      </InputLabel>

      <MUSelect
        autoWidth={true}
        id={`${id}_select`}
        labelId={`${id}_label`}
        onChange={(e) =>
          onChange(
            options.find((option) => option.key === e.target.value)?.value as T
          )
        }
        value={options.find((option) => option.value === value)?.key}
        disabled={isDisabled}
        placeholder={placeholder}
        className={className}
        error={!isValid}
        variant={variant}
      >
        {options.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </MUSelect>
    </FormControl>
  );
}
