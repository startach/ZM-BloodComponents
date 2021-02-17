import {FormControlLabel} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

export interface IZMCheckboxProps {
  label: string
  isChecked: boolean
  setChecked:() => void
}

const ZMCheckbox: React.FC<IZMCheckboxProps> = ({label, isChecked, setChecked}: IZMCheckboxProps) => {
  return (
    <FormControlLabel
        control={
          <Checkbox
              checked={isChecked}
              onChange={setChecked}
              color="primary"
          />
        }
        label={label}
    />
  )
}

export default ZMCheckbox;