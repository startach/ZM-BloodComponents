import { getAllLatestAppointments, setAppointment } from "../AppointmentDataAccessLayer";
import { AppointmentStatus } from "@zm-blood-components/common/src";
const fs = require('fs');

export async function addStatusForAppointments(){
  const appointments = await getAllLatestAppointments();

  return appointments.map((appointment) => {
    let newStatus = AppointmentStatus.AVAILABLE;
    const now = new Date();
    if(appointment.donorId !== "")
    {
      if (appointment.donationStartTime.toDate() < now)
        newStatus = AppointmentStatus.COMPLETED; // should this be completed?
      else
        newStatus = AppointmentStatus.BOOKED;
    }
    else
    {
      if(appointment.donationStartTime.toDate() < now)
        newStatus = AppointmentStatus.NOSHOW
    }
    return {
      status: newStatus,
      ...appointment
    };
  });
}

export async function migrateAppointmentStatus(){
  const updatedAppointments = await addStatusForAppointments();
  const stream = fs.createWriteStream('results.txt', {flags:'a'});
  for(const appointment of updatedAppointments){
    stream.write(`${appointment.id},${appointment.donorId},${appointment.donationStartTime.toDate()},${appointment.status}\n`);
    await setAppointment(appointment)
  }
  stream.end()

}