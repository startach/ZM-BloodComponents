import {
  getAllAppointments,
  setAppointment,
} from "../AppointmentDataAccessLayer";
import { AppointmentStatus } from "@zm-blood-components/common/src";
import * as functions from "firebase-functions";
const fs = require("fs");

export async function addStatusForAppointments() {
  const appointments = await getAllAppointments();

  return appointments.map((appointment) => {
    let newStatus = AppointmentStatus.AVAILABLE;
    const now = new Date();
    if (appointment.donorId !== "") {
      if (appointment.donationStartTime.toDate() < now)
        newStatus = AppointmentStatus.COMPLETED;
      // should this be completed?
      else newStatus = AppointmentStatus.BOOKED;
    }
    return {
      status: newStatus,
      ...appointment,
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
}
