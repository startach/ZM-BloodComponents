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
}

function AppointmentPicker({
  donationDay,
  onSlotSelected,
}: AppointmentPickerProps) {
  const dayString = `${DateUtils.ToWeekDayString(
    donationDay.day,
    DateUtils.DateDisplayFormat
  )}, ${donationDay.day}`;

  return (
    <div>
      <div>תורים פנויים</div>
      <div className={styles.dayTitle}>{dayString}</div>

      {donationDay.hospitalSlots.map((hospitalDaySlots) => (
        <HospitalCard
          key={hospitalDaySlots.hospital + hospitalDaySlots.slots.length}
          hospitalDaySlots={hospitalDaySlots}
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
    <Card className={styles.hospitalCard}>
      <div className={styles.hospitalName}>{hospitalName} </div>
      <Picker options={options} onChange={props.onSlotSelected} />
    </Card>
  );
}

export default AppointmentPicker;
