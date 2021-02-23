import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";
import { SelectOption } from "@zm-blood-components/common";

type SelectVariant = "standard" | "filled" | "outlined";

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
