import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export interface ICheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export default function CheckBox({
  label,
  isChecked,
  onChange,
}: ICheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={onChange} color="primary" />
      }
      label={label}
    />
  );
}
