import * as admin from "firebase-admin";
import { Collections } from "@zm-blood-components/common";

export type EmailMessage = {
  to: string[];
  message: {
    subject: string;
    text: string;
  };
};

export function addEmailToQueue(message: EmailMessage) {
  return admin
    .firestore()
    .collection(Collections.EMAIL_NOTIFICATIONS)
    .add(message);
}
