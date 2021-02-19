import React, { useState } from "react";
import "./AppointmentForm.css";
import Select from "../../components/Select";
import { SelectOption } from "../../components/Select/Select";
import { Hospital, LocaleUtils } from "@zm-blood-components/common";
import Input from "../../components/Input";
import Button from "../../components/Button";

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
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [slots, setSlots] = useState(1);

  const isButtonDisable = () => !(hospital && date && hour && slots);

  const onSave = () => {
    setDate("");
    setHour("");
    setSlots(1);
    props.addSlotsRequest(hospital, new Date(), slots);
  };

  return (
    <div className="appointmentForm">
      <Select
        label={"בית חולים"}
        options={hospitalOptions}
        onChange={setHospital}
        value={hospital}
      />
      <Input value={date} onChangeText={setDate} label={"תאריך"} />
      <Input value={hour} onChangeText={setHour} label={"שעה"} />
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