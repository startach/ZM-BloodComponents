import Switch from "@mui/material/Switch";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";
import styles from "./Toggle.module.scss";

export interface CheckboxProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({
  name,
  label,
  value,
  onChange,
}: CheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange(checked);

    reportClick(AnalyticsButtonType.Toggle, name, `${checked}`);
  };

  return (
    <div className={styles.container}>
      <Switch
        checked={value}
        onChange={(e) => handleChange(e.target.checked)}
        color="primary"
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
