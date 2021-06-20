import styles from "./AppointmentPicker.module.scss";
import {
  DonationDay,
  DonationSlot,
  HospitalDaySlots,
} from "../../utils/AppointmentsGrouper";
import {
  DateUtils,
  LocaleUtils,
  SelectOption,
} from "@zm-blood-components/common";
import Picker from "../basic/Picker";
import { Card } from "@material-ui/core";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";

export interface AppointmentPickerProps {
  donationDay: DonationDay;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  showHospitalName: boolean;
}

function AppointmentPicker({
  donationDay,
  onSlotSelected,
  showHospitalName,
}: AppointmentPickerProps) {
  const dayString = `${DateUtils.ToWeekDayString(
    donationDay.day,
    DateUtils.DateDisplayFormat
  )}, ${donationDay.day}`;

  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayTitle}>{dayString}</div>

      {donationDay.hospitalSlots.map((hospitalDaySlots) => (
        <HospitalCard
          key={hospitalDaySlots.hospital + hospitalDaySlots.slots.length}
          hospitalDaySlots={hospitalDaySlots}
          showHospitalName={showHospitalName}
          onSlotSelected={(slot) => {
            onSlotSelected({
              ...slot,
              hospital: hospitalDaySlots.hospital,
            });
          }}
        />
      ))}
    </div>
  );
}

function HospitalCard(props: {
  hospitalDaySlots: HospitalDaySlots;
  onSlotSelected: (donationSlot: DonationSlot) => void;
  showHospitalName: boolean;
}) {
  const options = props.hospitalDaySlots.slots.map<SelectOption<DonationSlot>>(
    (slot) => ({
      key: props.hospitalDaySlots.hospital + slot.donationStartTimeMillis,
      label: DateUtils.ToTimeString(new Date(slot.donationStartTimeMillis)),
      value: slot,
    })
  );

  const hospitalName = LocaleUtils.getHospitalName(
    props.hospitalDaySlots.hospital
  );

  return (
    <>
      {props.showHospitalName && (
        <div className={styles.hospitalName}>{hospitalName} </div>
      )}
      <div className={styles.hospitalCard}>
        <Picker options={options} onChange={props.onSlotSelected} />
      </div>
    </>
  );
}

export default AppointmentPicker;
