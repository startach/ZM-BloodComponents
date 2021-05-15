import { useState } from "react";
import styles from "./AddAppointmentsForm.module.scss";
import Select from "../../components/Select";
import {
  Hospital,
  HospitalUtils,
  SelectOption,
} from "@zm-blood-components/common";
import Button from "../../components/Button";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import HeaderSection from "../../components/HeaderSection";

const slotOptions: SelectOption<number>[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (n) => ({
    label: n + "",
    value: n,
    key: n + "",
  })
);

interface AddAppointmentsFormProps {
  addSlotsRequest: (
    hospital: Hospital,
    donationStartTime: Date,
    slots: number
  ) => void;
}

export default function AddAppointmentsForm(props: AddAppointmentsFormProps) {
  const [hospital, setHospital] = useState<Hospital | "">("");
  const [date, setDate] = useState<Date | null>(getInitialDate());
  const [hour, setHour] = useState<Date | null>(getInitialDate());
  const [slots, setSlots] = useState(1);

  const isButtonDisable = () => !(hospital && date && slots);

  const onSave = () => {
    if (!date || !hour || !hospital) {
      return;
    }
    // Populate date with hour
    const result = new Date(date);
    result.setHours(hour.getHours());
    result.setMinutes(hour.getMinutes());

    props.addSlotsRequest(hospital, result, slots);
  };

  return (
    <HeaderSection className={styles.component}>
      <Select
        className={styles.field}
        id={"hospital"}
        label={"בית חולים"}
        options={HospitalUtils.getAllHospitalOptions()}
        onChange={setHospital}
        value={hospital}
      />
      <DatePicker
        className={styles.field}
        value={date}
        onChange={setDate}
        label={"תאריך"}
        disablePast
      />
      <TimePicker
        className={styles.field}
        value={hour}
        onChange={setHour}
        label={"שעה"}
      />
      <Select
        className={styles.field}
        id={"donations_count"}
        label={"מספר עמדות"}
        options={slotOptions}
        onChange={setSlots}
        value={slots}
      />

      <Button onClick={onSave} title="הוספה" isDisabled={isButtonDisable()} />
    </HeaderSection>
  );
}

function getInitialDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(11);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}
