import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";

type SelectVariant = "standard" | "filled" | "outlined";

export interface SelectOption<T> {
  value: T;
  key: string;
  label: string;
}

type SelectProps<T> = {
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
};

export default function ZMSelect<T>({
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
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NativeSelect
        id={id}
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
          <option key={key} value={key} label={label} />
        ))}
      </NativeSelect>
    </div>
  );
}
