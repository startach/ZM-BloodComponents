import React from "react";

interface PasswordInputProps {
  onChangeText: (newValue: string) => void;
  value: string;
  className?: string;
}

const PasswordInput: React.FunctionComponent<PasswordInputProps> = (
  props: PasswordInputProps
) => {
  const { onChangeText, value, ...otherProps } = props;
  return (
    <div>
      <input
        onChange={(e) => onChangeText(e.currentTarget.value)}
        value={value}
        {...otherProps}
      />
    </div>
  );
};

export default PasswordInput;
