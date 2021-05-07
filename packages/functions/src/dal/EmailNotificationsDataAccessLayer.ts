import * as admin from "firebase-admin";
import { Collections } from "@zm-blood-components/common";

export type EmailMessage = {
  to: string | string[];
  message: {
    subject: string;
    html: string;
  };
  appointmentId: string;
};

export function addEmailToQueue(message: EmailMessage) {
  return admin
    .firestore()
    .collection(Collections.EMAIL_NOTIFICATIONS)
    .add(message);
}
