import {
  getAllAppointments,
  setAppointment,
} from "../AppointmentDataAccessLayer";
import { AppointmentStatus } from "@zm-blood-components/common/src";
import * as functions from "firebase-functions";

export async function addStatusForAppointments() {
  const appointments = await getAllAppointments();

  return appointments.map((appointment) => {
    let newStatus = AppointmentStatus.AVAILABLE;
    if (appointment.donorId !== "") {
      newStatus = AppointmentStatus.BOOKED;
    }
    if (newStatus !== appointment.status) {
      functions.logger.warn(
        `status appointment after change is different old status :${appointment.status}, new ${newStatus}`
      );
    }

    return {
      ...appointment,
      status: newStatus,
    };
  });
}

export async function migrateAppointmentStatus() {
  const updatedAppointments = await addStatusForAppointments();

  for (const appointment of updatedAppointments) {
    functions.logger.info(
      `changing appointment ${appointment.id},${
        appointment.donorId
      },${appointment.donationStartTime.toDate()},${appointment.status}`
    );
    await setAppointment(appointment);
  }
  return {
    message: "success!",
    status: 200,
  };
}
