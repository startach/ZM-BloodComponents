import Switch from "@material-ui/core/Switch";
import styles from "./Toggle.module.scss";

export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ label, value, onChange }: CheckboxProps) {
  return (
    <div className={styles.container}>
      <Switch
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
