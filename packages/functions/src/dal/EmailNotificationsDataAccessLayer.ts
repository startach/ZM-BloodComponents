import * as admin from "firebase-admin";
import { Collections } from "@zm-blood-components/common";

export type EmailMessage = {
  to: string;
  message: {
    subject: string;
    html: string;
  };
  appointmentId: string;
};

export type StaffRecipient = {
  email: string;
  name: string;
};

export function addEmailToQueue(message: EmailMessage) {
  return admin
    .firestore()
    .collection(Collections.EMAIL_NOTIFICATIONS)
    .add({
      ...message,
      date: admin.firestore.Timestamp.now(),
    });
}

export function addEmailsToQueue(messages: EmailMessage[]) {
  return Promise.all(messages.map(addEmailToQueue));
}
