// import { DbAppointment, DbDonor } from "@zm-blood-components/common";
// import { getAppointmentNotificationData } from "./AppointmentNotificationData";
// import { getStaffRecipients } from "./StaffEmailRecipientsCalculator";
// import {
//   NotificationToCoordinator,
//   sendEmailToCoordinators,
// } from "./NotificationSender";
//
// export async function notifyOnAppointmentWithType(
//   appointment: DbAppointment,
//   donor: DbDonor,
//   type: NotificationToCoordinator
// ) {
//   if (donor.testUser) {
//     console.log("Not sending email to test user");
//     return;
//   }
//
//   const appointmentNotificationData = getAppointmentNotificationData(
//     appointment,
//     donor
//   );
//
//   const staffEmails = await getStaffRecipients(appointment);
//
//   await sendEmailToCoordinators(type, appointmentNotificationData, staffEmails);
// }
