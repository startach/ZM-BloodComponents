import * as functions from "firebase-functions";
import sgMail from "@sendgrid/mail";
import { AppointmentNotificationData } from "./AppointmentNotificationData";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";

const FROM_NAME = "בנק מרכיבי הדם של זכרון מנחם";
const FROM_EMAIL = "no-reply@zichron.org";

export enum NotificationToDonor {
  APPOINTMENT_BOOKED,
  APPOINTMENT_CANCELLED_BY_COORDINATOR,
}

export async function sendEmailToDonor(
  type: NotificationToDonor,
  data: AppointmentNotificationData,
  donorEmail: string
) {
  sgMail.setApiKey(functions.config().sendgrid.key);
  functions.logger.info(
    `Sending ${type} notification to donor ${data.donorName} for appointment ${data.appointmentId} `
  );

  let templateId = "";
  switch (type) {
    case NotificationToDonor.APPOINTMENT_BOOKED:
      templateId = "d-bc903eb650834faea78bd8281bb38010";
      break;
    case NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR:
      templateId = "d-efc1aeb750f542ec9fb1120c03e97a68";
      break;
    default:
      return;
  }

  const msg: MailDataRequired = {
    to: donorEmail,
    from: {
      name: FROM_NAME,
      email: FROM_EMAIL,
    },
    templateId: templateId,
    dynamicTemplateData: data,
  };

  await sgMail.send(msg);
}

export enum NotificationToCoordinator {
  APPOINTMENT_BOOKED,
  APPOINTMENT_CANCELLED_BY_DONOR,
  CLOSE_APPOINTMENT_CANCELLED_BY_DONOR,
}

export async function sendEmailToCoordinators(
  type: NotificationToCoordinator,
  data: AppointmentNotificationData,
  staffRecipients: StaffRecipient[]
) {
  sgMail.setApiKey(functions.config().sendgrid.key);
  functions.logger.info(
    `Sending ${type} notification to coordinators ${staffRecipients.map(
      (x) => x.name
    )} for appointment ${data.appointmentId} `
  );

  let templateId = "";
  switch (type) {
    case NotificationToCoordinator.APPOINTMENT_BOOKED:
      templateId = "d-bbed42a50eff457a8a841e4020e3e641";
      break;
    case NotificationToCoordinator.APPOINTMENT_CANCELLED_BY_DONOR:
      templateId = "d-5fedb07c785e48ac8f642679709254b9";
      break;
    case NotificationToCoordinator.CLOSE_APPOINTMENT_CANCELLED_BY_DONOR:
      templateId = "d-bec60f5ca3c1413d8bb96e4c62abd192";
      break;
    default:
      return;
  }

  const messages = staffRecipients.map<MailDataRequired>((recipient) => ({
    to: recipient.email,
    from: {
      name: FROM_NAME,
      email: FROM_EMAIL,
    },
    templateId: templateId,
    dynamicTemplateData: {
      ...data,
      coordinatorName: recipient.name,
    },
  }));

  await sgMail.send(messages);
}
