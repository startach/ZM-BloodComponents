import Checkbox from "@mui/material/Checkbox";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  name: string;
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({
  /** For logging and Analytics */
  name,
  label,
  isChecked,
  onChange,
}: CheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange(checked);
    reportClick(AnalyticsButtonType.Checkbox, name, String(checked));
  };

  return (
    <div className={styles.container}>
      <Checkbox
        checked={isChecked}
        onChange={(e) => handleChange(e.target.checked)}
        color="primary"
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
