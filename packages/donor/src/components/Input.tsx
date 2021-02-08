import { Input } from "semantic-ui-react"

type InputProps = {
  onChangeText: (newValue: string) => void,
  value?: any,
  label?: string,
  type?: string,
  isDisabled?: boolean,
  placeholder?: string,
  className: string,
}

export default function ZMInput({ placeholder = "", type = "text", label, value, onChangeText, className }: InputProps) {
  console.log(type)
  return (
    <Input
      value={value}
      type={type}
      label={label}
      onChange={(e) => onChangeText(e.currentTarget.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}
