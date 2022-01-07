import React, { useState } from "react";
import { Appointment, DonationDay } from "../../utils/types";
import AppointmentSlotComponent from "../../components/AppointmentSlot";
import styles from "./DonationDayScreen.module.scss";
import _ from "lodash";
import Toggle from "../../components/Toggle";
import { DateUtils } from "@zm-blood-components/common";
import CoordinatorHeader from "../../components/CoordinatorHeader";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import AddAppointmentFab from "../../components/AddAppointmentFab";

export type DonationDayScreenProps = {
  donationDay: DonationDay;
  onClickOnAppointment: (appointmentId: string) => void;
  onDeleteAppointment: (appointmentId: string) => void;
  onAdd: () => void;
};

export default function DonationDayScreen({
  onDeleteAppointment,
  onClickOnAppointment,
  onAdd,
  donationDay,
}: DonationDayScreenProps) {
  const [showOnlyAvailableAppointments, setShowOnlyAvailableAppointments] =
    useState(false);

  return (
    <div className={styles.donationDay}>
      <CoordinatorHeader
        variant={HeaderVariant.INFO}
        hasBackButton
        hasNotificationsIcon
        title={"ניהול תורים"}
        stickyComponent={
          <DayHeader
            donationDay={donationDay}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
            setShowOnlyAvailableAppointments={setShowOnlyAvailableAppointments}
          />
        }
      />

      <div className={styles.slots}>
        {donationDay.appointmentSlots.map((slot, index) => (
          <AppointmentSlotComponent
            key={index + "." + slot.donationStartTimeMillis}
            appointmentSlot={slot}
            onClickOnAppointment={onClickOnAppointment}
            onDeleteAppointment={onDeleteAppointment}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
          />
        ))}
      </div>

      <AddAppointmentFab onClick={onAdd} />
    </div>
  );
}

function DayHeader(props: {
  donationDay: DonationDay;
  showOnlyAvailableAppointments: boolean;
  setShowOnlyAvailableAppointments: (show: boolean) => void;
}) {
  const allAppointments = _.flatMap(
    props.donationDay.appointmentSlots,
    (x) => x.appointments
  );
  const appointmentsCount = allAppointments.length;
  const bookedAppointmentsCount = allAppointments.filter(
    (x) => x.booked
  ).length;
  return (
    <>
      <div className={styles.donationDate}>
        <DayString allAppointments={allAppointments} />

        <div className={styles.data}>
          <span>{appointmentsCount} תורים</span>
          <span className={styles.dataDivider}>|</span>
          <span>{bookedAppointmentsCount} רשומים</span>
        </div>
      </div>

      <div className={styles.availableAppointmentsToggle}>
        הצג תורים פנויים בלבד
        <Toggle
          className={styles.toggle}
          enabled={props.showOnlyAvailableAppointments}
          onChange={() =>
            props.setShowOnlyAvailableAppointments(
              !props.showOnlyAvailableAppointments
            )
          }
        />
      </div>
    </>
  );
}

function DayString(props: { allAppointments: Appointment[] }) {
  if (props.allAppointments.length === 0) {
    return null;
  }

  const arbitraryStartTime = props.allAppointments[0].donationStartTimeMillis;
  const weekdayString = DateUtils.ToWeekDayString(arbitraryStartTime);
  const dateString = DateUtils.ToShortDateString(arbitraryStartTime);

  return (
    <div className={styles.dayString}>
      <span className={styles.weekday}>{weekdayString}</span>
      <span>{dateString}</span>
    </div>
  );
}
