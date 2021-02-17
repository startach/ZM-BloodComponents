import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({
  label,
  isChecked,
  onChange,
}: CheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label={label}
    />
  );
}
