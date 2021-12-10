import React, { useState } from "react";
import { Appointment, DonationDay } from "../../utils/types";
import AppointmentSlotComponent from "../AppointmentSlot";
import styles from "./DonationDayComponent.module.scss";
import _ from "lodash";
import Toggle from "../Toggle";
import { DateUtils } from "@zm-blood-components/common";

export type DonationDayComponentProps = {
  donationDay: DonationDay;
  onClickOnAppointment: (appointmentId: string) => void;
  onAdd: () => void;
};

export default function DonationDayComponent({
  onClickOnAppointment,
  onAdd,
  donationDay,
}: DonationDayComponentProps) {
  const [showOnlyAvailableAppointments, setShowOnlyAvailableAppointments] =
    useState(false);

  const allAppointments = _.flatMap(
    donationDay.appointmentSlots,
    (x) => x.appointments
  );
  const appointmentsCount = allAppointments.length;
  const bookedAppointmentsCount = allAppointments.filter(
    (x) => x.booked
  ).length;

  return (
    <div className={styles.donationDay}>
      <div className={styles.donationDayHeader}>
        <DayString allAppointments={allAppointments} />

        <div className={styles.data}>
          <span>{appointmentsCount} תורים</span>
          <span className={styles.dataDivider}>|</span>
          <span>{bookedAppointmentsCount} רשומים</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.availableAppointmentsToggle}>
          הצג תורים פנויים בלבד
          <Toggle
            className={styles.toggle}
            enabled={showOnlyAvailableAppointments}
            onChange={() =>
              setShowOnlyAvailableAppointments(!showOnlyAvailableAppointments)
            }
          />
        </div>
      </div>

      <div className={styles.slots}>
        {donationDay.appointmentSlots.map((slot, index) => (
          <AppointmentSlotComponent
            key={index + "." + slot.donationStartTimeMillis}
            appointmentSlot={slot}
            onAdd={onAdd}
            onClickOnAppointment={onClickOnAppointment}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
          />
        ))}
      </div>
    </div>
  );
}

function DayString(props: { allAppointments: Appointment[] }) {
  if (props.allAppointments.length === 0) {
    return null;
  }

  const arbitraryStartTime = props.allAppointments[0].donationStartTimeMillis;
  const weekdayString = DateUtils.ToWeekDayString(arbitraryStartTime);
  const dateString = DateUtils.ToDateString(arbitraryStartTime);

  return (
    <div className={styles.dayString}>
      <span className={styles.weekday}>{weekdayString}</span>
      <span>{dateString}</span>
    </div>
  );
}
