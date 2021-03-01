import React from "react";
import {
  DateUtils,
  Donor,
  FunctionsApi,
  LocaleUtils,
} from "@zm-blood-components/common";
import Button from "../../components/Button";

interface ManageAppointmentsScreenProps {
  appointments: FunctionsApi.AppointmentApiEntry[];
  donorsInAppointments: Donor[];
  onDeleteAvailableAppointment: (appointmentId: string) => void;
}

export default function ManageAppointmentsScreen(
  props: ManageAppointmentsScreenProps
) {
  const getDonor = (donorId?: string) => {
    if (!donorId) {
      return undefined;
    }

    const donors = props.donorsInAppointments.filter(
      (donor) => donor.id === donorId
    );
    if (donors.length !== 1) {
      console.error("Unexpected number of donors:", donors.length);
      return undefined;
    }

    return donors[0];
  };

  return (
    <div>
      {props.appointments.map((appointment) => (
        <AppointmentRow
          appointment={appointment}
          donor={getDonor(appointment.donorId)}
          key={appointment.id}
          onDeleteAvailableAppointment={props.onDeleteAvailableAppointment}
        />
      ))}
    </div>
  );
}

function AppointmentRow(props: {
  appointment: FunctionsApi.AppointmentApiEntry;
  donor?: Donor;
  onDeleteAvailableAppointment: (appointmentId: string) => void;
}) {
  const dateString = DateUtils.ToDateString(
    props.appointment.donationStartTimeMillis
  );
  const hourString = DateUtils.ToTimeString(
    props.appointment.donationStartTimeMillis
  );

  const donor = props.donor;

  return (
    <div>
      <span>יום: {dateString} </span>
      <span> שעה: {hourString} </span>
      {donor && (
        <>
          <span>
            תורם: {donor.firstName} {donor.lastName}
          </span>
          <span> טלפון: {donor.phone} </span>
          <span>
            {" "}
            סוג דם: {LocaleUtils.getBloodTypeTranslation(donor.bloodType)}{" "}
          </span>
        </>
      )}
      <Button
        title="מחק"
        onClick={() => props.onDeleteAvailableAppointment(props.appointment.id)}
      />
    </div>
  );
}
