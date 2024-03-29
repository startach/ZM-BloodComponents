import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DonationDay } from "../../utils/types";
import AppointmentSlotComponent from "../../components/AppointmentSlot";
import styles from "./DonationDayScreen.module.scss";
import _ from "lodash";
import Toggle from "../../components/Toggle";
import { Appointment, DateUtils, Hospital } from "@zm-blood-components/common";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";

export type DonationDayScreenProps = {
  dayStartTime: Date;
  donationDay: DonationDay;
  hospital: Hospital;
  onDeleteAppointment: (appointmentId: string) => void;
  onAdd: () => void;
};

export default function DonationDayScreen({
  onDeleteAppointment,
  dayStartTime,
  donationDay,
  hospital,
}: DonationDayScreenProps) {
  const [showOnlyAvailableAppointments, setShowOnlyAvailableAppointments] =
    useState(false);

  const { timestamp } = useParams<{ timestamp: string }>();
  const currentScheduleTime = timestamp ? parseInt(timestamp) : undefined;

  const allAppointments = donationDay
    ? _.flatMap(donationDay.appointmentSlots, (x) => x.appointments)
    : [];

  return (
    <CoordinatorScreen
      headerProps={{
        title: "ניהול תורים",
        variant: HeaderVariant.INFO,
        hasBackButton: true,
        hasNotificationsIcon: true,
        stickyComponent: (
          <DayHeader
            dayStartTime={dayStartTime}
            allAppointments={allAppointments}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
            setShowOnlyAvailableAppointments={setShowOnlyAvailableAppointments}
          />
        ),
      }}
      addAppointmentFabProps={{
        hospital,
        timestamp: currentScheduleTime,
      }}
    >
      <div className={styles.slots}>
        {donationDay.appointmentSlots.map((slot, index) => (
          <AppointmentSlotComponent
            key={
              index +
              "." +
              slot.donationStartTimeMillis +
              "." +
              slot.appointments.length
            }
            appointmentSlot={slot}
            onDeleteAppointment={onDeleteAppointment}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
          />
        ))}

        {donationDay.appointmentSlots.length === 0 && (
          <div className={styles.noAppointments}>טרם נקבעו תורים ליום זה</div>
        )}

        {/*To avoid showing an appointment under the FAB*/}
        <div className={styles.emptySpace} />
      </div>
    </CoordinatorScreen>
  );
}

function DayHeader(props: {
  dayStartTime: Date;
  allAppointments: Appointment[];
  showOnlyAvailableAppointments: boolean;
  setShowOnlyAvailableAppointments: (show: boolean) => void;
}) {
  const bookedAppointmentsCount = props.allAppointments.filter(
    (x) => x.booked
  ).length;
  const appointmentsCount = props.showOnlyAvailableAppointments
    ? props.allAppointments.length - bookedAppointmentsCount
    : props.allAppointments.length;
  return (
    <>
      <div className={styles.donationDate}>
        <DayString dayStartTime={props.dayStartTime} />

        <div className={styles.data}>
          <span>{appointmentsCount} תורים</span>
          {!props.showOnlyAvailableAppointments && (
            <span className={styles.dataDivider}>|</span>
          )}
          {!props.showOnlyAvailableAppointments && (
            <span>{bookedAppointmentsCount} רשומים</span>
          )}
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

function DayString(props: { dayStartTime: Date }) {
  const arbitraryStartTime = props.dayStartTime;
  const weekdayString = DateUtils.ToWeekDayString(arbitraryStartTime);
  const dateString = DateUtils.ToShortDateString(arbitraryStartTime);

  return (
    <div className={styles.dayString}>
      <span className={styles.weekday}>{weekdayString}</span>
      <span>{dateString}</span>
    </div>
  );
}
