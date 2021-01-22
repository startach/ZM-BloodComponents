import * as functions from "firebase-functions";
import addNewAppointmentHandler from "./admin/AddNewAppointmentHandler";
import * as admin from "firebase-admin";
import { handler } from "./RequestHandleWrapper";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });
const db = admin.firestore();

export const addNewAppointment = handler(addNewAppointmentHandler, db);
