import Checkbox from "@mui/material/Checkbox";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";
import styles from "./Checkbox.module.scss";

export type CheckboxProps = {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  analytics: AnalyticsData;
};

export default function CheckBox({
  label,
  isChecked,
  onChange,
  analytics,
}: CheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange(checked);

    if (!analytics) return;

    reportClick(
      AnalyticsButtonType.Checkbox,
      analytics.analyticsName,
      String(checked)
    );
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
