import { DateUtils, Hospital } from "@zm-blood-components/common";
import AppointmentPicker from "./AppointmentPicker";
import { action } from "@storybook/addon-actions";
import { DonationDay, DonationSlot } from "../../utils/AppointmentsGrouper";
import styles from "./AppointmentPicker.module.scss";

export default {
  component: AppointmentPicker,
  title: "Components/Appointment Picker",
  parameters: { layout: "fullscreen" },
};

export const Default = () => {
  const donationDay: DonationDay = {
    day: DateUtils.ToDateString(new Date(2021, 5, 13)),
    hospitalSlots: [
      {
        hospital: Hospital.TEL_HASHOMER,
        slots: generateSlots(9),
      },
      {
        hospital: Hospital.HADASA,
        slots: generateSlots(4),
      },
    ],
  };

  return (
    <div className={styles.storyBackground}>
      <AppointmentPicker
        onSlotSelected={action("Selected")}
        donationDay={donationDay}
        showHospitalName={true}
      />
    </div>
  );
};

export const NoHospitalName = () => {
  const donationDay: DonationDay = {
    day: DateUtils.ToDateString(new Date(2021, 5, 13)),
    hospitalSlots: [
      {
        hospital: Hospital.TEL_HASHOMER,
        slots: generateSlots(9),
      },
    ],
  };

  return (
    <div className={styles.storyBackground}>
      <AppointmentPicker
        onSlotSelected={action("Selected")}
        donationDay={donationDay}
        showHospitalName={false}
      />
    </div>
  );
};

function generateSlots(numberOfSlots: number): DonationSlot[] {
  const res: DonationSlot[] = [];
  const firstAppointmentMillis = 1628845200000;
  for (let i = 0; i < numberOfSlots; i++) {
    const startTimeMillis = firstAppointmentMillis + i * 45 * 60 * 1_000;
    res.push({
      appointmentIds: [
        "appointment.1." + startTimeMillis,
        "appointment.2." + startTimeMillis,
      ],
      donationStartTimeMillis: startTimeMillis,
    });
  }

  return res;
}
