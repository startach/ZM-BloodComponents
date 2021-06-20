import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Checkbox.module.scss";

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
    <div className={styles.container}>
      <Checkbox
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
