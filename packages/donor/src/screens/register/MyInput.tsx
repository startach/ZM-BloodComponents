import React from "react";

interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
        > {
  onChangeText: (newValue: string) => void;
}

export default function MyInput(props: InputProps) {
  const { onChangeText, ...otherProps } = props;
  return (
      <div>
        <input
            onChange={(e) => onChangeText(e.currentTarget.value)}
            {...otherProps}
        />
      </div>
  );
}