import Switch from "@mui/material/Switch";
import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";
import styles from "./Toggle.module.scss";

export type CheckboxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  analytics: AnalyticsData;
};

export default function Toggle({
  label,
  value,
  onChange,
  analytics,
}: CheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange(checked);

    if (!analytics) return;

    reportClick(
      AnalyticsButtonType.Toggle,
      analytics.analyticsName,
      `${checked}`
    );
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
