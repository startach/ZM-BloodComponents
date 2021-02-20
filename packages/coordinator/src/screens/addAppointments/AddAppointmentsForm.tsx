import React, { useState } from "react";
import styles from "./AddAppointmentsForm.module.scss";
import Select from "../../components/Select";
import { SelectOption } from "../../components/Select/Select";
import { Hospital, LocaleUtils } from "@zm-blood-components/common";
import Button from "../../components/Button";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";

const hospitalOptions: SelectOption<Hospital>[] = [
  hospitalToOption(Hospital.TEL_HASHOMER),
  hospitalToOption(Hospital.ASAF_HAROFE),
];

function hospitalToOption(hospital: Hospital): SelectOption<Hospital> {
  return {
    label: LocaleUtils.getHospitalName(hospital),
    value: hospital,
    key: hospital,
  };
}

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
  const [hospital, setHospital] = useState<Hospital>(Hospital.TEL_HASHOMER);
  const [date, setDate] = useState<Date | null>(getInitialDate());
  const [slots, setSlots] = useState(1);

  const isButtonDisable = () => !(hospital && date && slots);

  const onSave = () => {
    props.addSlotsRequest(hospital, new Date(), slots);
  };

  return (
    <div className={styles.appointmentForm}>
      <Select
        label={"בית חולים"}
        options={hospitalOptions}
        onChange={setHospital}
        value={hospital}
      />
      <DatePicker value={date} onChange={setDate} label={"תאריך"} disablePast />
      <TimePicker value={date} onChange={setDate} label={"שעה"} />
      <Select
        label={"מספר תורים"}
        options={slotOptions}
        onChange={setSlots}
        value={slots}
      />

      <Button onClick={onSave} title="הוספה" isDisabled={isButtonDisable()} />
    </div>
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
