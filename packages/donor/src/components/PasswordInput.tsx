import React from "react";
import hidePassword from "./utils/PasswordHider";

interface PasswordInputProps {
  onChangeText: (newValue: string) => void;
  value: string;
  className?: string;
}

const PasswordInput: React.FunctionComponent<PasswordInputProps> = (
  props: PasswordInputProps
) => {
  const { onChangeText, value, ...otherProps } = props;
  const hiddenValue = hidePassword(value);
  return (
    <div>
      <input
        onChange={(e) => onChangeText(e.currentTarget.value)}
        value={hiddenValue}
        {...otherProps}
      />
    </div>
  );
};

export default PasswordInput;
