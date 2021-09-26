import {
  getPastAppointments,
  setAppointment,
} from "../AppointmentDataAccessLayer";
import { AppointmentStatus } from "@zm-blood-components/common/src";
import * as functions from "firebase-functions";

export async function addStatusForAppointments() {
  const appointments = await getPastAppointments();

  return appointments.map((appointment) => {
    let newStatus = AppointmentStatus.AVAILABLE;
    if (appointment.donorId !== "") {
      newStatus = AppointmentStatus.BOOKED;
    }
    return {
      status: newStatus,
      ...appointment,
    };
  });
}

export async function migrateAppointmentStatus(wetRun: boolean) {
  const updatedAppointments = await addStatusForAppointments();

  for (const appointment of updatedAppointments) {
    functions.logger.info(
      `changing appointment ${appointment.id},${
        appointment.donorId
      },${appointment.donationStartTime.toDate()},${appointment.status}`
    );
    if (wetRun) {
      await setAppointment(appointment);
    }
  }
  return {
    message: "success!",
    status: 200,
  };
}
