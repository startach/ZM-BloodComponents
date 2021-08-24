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
import { NewSlots } from "./AddAppointmentsScreenContainer";

const slotOptions: SelectOption<number>[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
].map((n) => ({
  label: n + "",
  value: n,
  key: n + "",
}));

interface AddAppointmentsFormProps {
  activeHospitalsForCoordinator: Hospital[];
  slotsArray: NewSlots[];
  setSlotsArray: (newSlots: NewSlots[]) => void;
}

export default function AddAppointmentsForm(props: AddAppointmentsFormProps) {
  const [hospital, setHospital] = useState<Hospital | "">("");
  const [date, setDate] = useState<Date | null>(getInitialDate());
  const [hour, setHour] = useState<Date | null>(getInitialDate());
  const [slots, setSlots] = useState(1);

  const isButtonDisable = () => !(hospital && date && slots);

  /*
   * This is a cheat added for Beilinson hospital.
   * They asked to be able to add appointments, with specific hours, to the whole day in a single click.
   */
  const onAddWholeDay = () => {
    if (!date || hospital !== Hospital.BEILINSON) {
      return;
    }

    const hoursAndSlots = [
      [8, 1],
      [9, 1],
      [10, 1],
      [11, 1],
      [12, 1],
      [13, 1],
      [14, 1],
      [15, 2],
      [16, 2],
      [17, 2],
    ];

    const newSlots = hoursAndSlots.map<NewSlots>((hourAndSlots) => {
      const donationStartTime = new Date(date);
      donationStartTime.setHours(hourAndSlots[0]);
      donationStartTime.setMinutes(0);
      return {
        hospital,
        donationStartTime,
        slots: hourAndSlots[1],
        key: guidGenerator(),
      };
    });

    props.setSlotsArray([...props.slotsArray, ...newSlots]);
  };

  const onAdd = () => {
    if (!date || !hour || !hospital) {
      return;
    }
    // Populate date with hour
    const donationStartTime = new Date(date);
    donationStartTime.setHours(hour.getHours());
    donationStartTime.setMinutes(hour.getMinutes());

    const newSlot: NewSlots = {
      hospital,
      donationStartTime,
      slots,
      key: guidGenerator(),
    };

    props.setSlotsArray([...props.slotsArray, newSlot]);
  };

  return (
    <HeaderSection className={styles.component}>
      <Select
        className={styles.field}
        id={"hospital"}
        label={"בית חולים"}
        options={HospitalUtils.getHospitalOptions(
          props.activeHospitalsForCoordinator
        )}
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

      <Button onClick={onAdd} title="הוספה" isDisabled={isButtonDisable()} />
      {hospital == Hospital.BEILINSON && (
        <Button
          onClick={onAddWholeDay}
          title="יום שלם"
          isDisabled={isButtonDisable()}
        />
      )}
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

// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  const res =
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4();
  return res;
}
