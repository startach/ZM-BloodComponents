import * as functions from "firebase-functions";
import sgMail from "@sendgrid/mail";
import { createEvent, EventAttributes, EventStatus } from "ics";
import { AppointmentNotificationData } from "./AppointmentNotificationData";
import { StaffRecipient } from "../dal/EmailNotificationsDataAccessLayer";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { DbDonor } from "../function-types";

const FROM_NAME = "בנק מרכיבי הדם של זכרון מנחם";
const FROM_EMAIL = "no-reply@zichron.org";

export enum NotificationToDonor {
  APPOINTMENT_BOOKED = "APPOINTMENT_BOOKED",
  APPOINTMENT_CANCELLED_BY_COORDINATOR = "APPOINTMENT_CANCELLED_BY_COORDINATOR",
  DONATION_CONFIRMATION = "DONATION_CONFIRMATION",
}

export async function sendEmailToDonor(
  type: NotificationToDonor,
  data: AppointmentNotificationData,
  donor: DbDonor
) {
  if (donor.notificationSettings?.disableEmailNotifications) {
    functions.logger.info(
      `NOT sending ${type} notification to donor ${data.donorName}.`
    );
    return;
  }

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
    case NotificationToDonor.DONATION_CONFIRMATION:
      templateId = "d-9875da5105274900826e8f1492508758";
      break;
    default:
      return;
  }

  const msg: MailDataRequired = {
    to: donor.email,
    from: {
      name: FROM_NAME,
      email: FROM_EMAIL,
    },
    templateId: templateId,
    dynamicTemplateData: data,
  };

  if (shouldAddCalendarEventToDonor(type)) {
    addCalendarEventToDonor(msg, type, data, donor.email);
  }

  await sgMail.send(msg);
}

export enum NotificationToCoordinator {
  APPOINTMENT_BOOKED = "APPOINTMENT_BOOKED",
  APPOINTMENT_CANCELLED_BY_DONOR = "APPOINTMENT_CANCELLED_BY_DONOR",
  CLOSE_APPOINTMENT_CANCELLED_BY_DONOR = "CLOSE_APPOINTMENT_CANCELLED_BY_DONOR",
}

export async function sendEmailToCoordinators(
  type: NotificationToCoordinator,
  data: AppointmentNotificationData,
  staffRecipients: StaffRecipient[]
) {
  sgMail.setApiKey(functions.config().sendgrid.key);
  functions.logger.info(
    `Sending ${type} notification to coordinators ${staffRecipients.map(
      (x) => x.email
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

function shouldAddCalendarEventToDonor(type: NotificationToDonor) {
  switch (type) {
    case NotificationToDonor.APPOINTMENT_BOOKED:
    case NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR:
      return true;
    default:
      return false;
  }
}

function addCalendarEventToDonor(
  msg: MailDataRequired,
  type: NotificationToDonor,
  data: AppointmentNotificationData,
  donorEmail: string
) {
  const donationTime = new Date(data.donationStartTimeMillis);

  let status: EventStatus;
  switch (type) {
    case NotificationToDonor.APPOINTMENT_BOOKED:
      status = "CONFIRMED";
      break;
    case NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR:
    default:
      return;
  }

  const event: EventAttributes = {
    start: [
      donationTime.getFullYear(),
      donationTime.getMonth() + 1,
      donationTime.getDate(),
      donationTime.getHours(),
      donationTime.getMinutes(),
    ],
    duration: { hours: 2, minutes: 0 },
    title: "תרומת טרומבוציטים",
    location: "בית החולים " + data.hospital,
    status: status,
    busyStatus: "BUSY",
    organizer: { name: "זכרון מנחם", email: "dam@zichron.org" },
    attendees: [
      {
        name: data.donorName,
        email: donorEmail,
        rsvp: true,
        partstat: "NEEDS-ACTION",
        role: "REQ-PARTICIPANT",
      },
    ],
  };

  const { value } = createEvent(event);

  if (!msg.content) {
    msg.content = [];
  }

  msg.content.push({
    type: "text/plain",
    value: "Plain Content",
  });
  msg.content.push({
    type: "text/html",
    value: "HTML Content",
  });
  msg.content.push({
    type: "text/calendar; method=REQUEST",
    value: value!,
  });

  if (!msg.attachments) {
    msg.attachments = [];
  }

  msg.attachments.push({
    content: Buffer.from(value!).toString("base64"),
    type: "application/ics",
    filename: "invite.ics",
    disposition: "attachment",
  });
}
