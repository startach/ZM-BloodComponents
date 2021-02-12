import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";

type SelectVariant = "standard" | "filled" | "outlined";

type Option = { value: string; key: string; label: string };

type SelectProps = {
  id?: string;
  label?: string;
  onChange: (value: string) => void;
  value?: any;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  isValid?: boolean;
  variant?: SelectVariant;
  options: Option[];
};

export default function ZMSelect({
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
}: SelectProps) {
  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NativeSelect
        id={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        className={className}
        error={!isValid}
        variant={variant}
      >
        {options.map(({ key, value, label }) => (
          <option key={key} value={value} label={label} />
        ))}
      </NativeSelect>
    </div>
  );
}
