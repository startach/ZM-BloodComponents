import React from "react";
import {
  AvailableAppointment,
  BookedAppointment,
} from "@zm-blood-components/common";
import Button from "../../components/Button";

interface ManageAppointmentsScreenProps {
  availableAppointments: AvailableAppointment[];
  bookedAppointments: BookedAppointment[];
  onDeleteAvailableAppointment: (appointmentId: string) => void;
}

export default function ManageAppointmentsScreen(
  props: ManageAppointmentsScreenProps
) {
  return (
    <div>
      {props.availableAppointments.map((appointment) => (
        <AvailableAppointmentRow
          appointment={appointment}
          key={appointment.id}
          onDeleteAvailableAppointment={props.onDeleteAvailableAppointment}
        />
      ))}

      {props.bookedAppointments.map((appointment) => (
        <BookedAppointmentRow appointment={appointment} key={appointment.id} />
      ))}
    </div>
  );
}

function BookedAppointmentRow(props: { appointment: BookedAppointment }) {
  return <div>Booked: {props.appointment.id}</div>;
}

function AvailableAppointmentRow(props: {
  appointment: AvailableAppointment;
  onDeleteAvailableAppointment: (appointmentId: string) => void;
}) {
  return (
    <div>
      Available: {props.appointment.id}
      <Button
        title="מחק"
        onClick={() => props.onDeleteAvailableAppointment(props.appointment.id)}
      />
    </div>
  );
}
