import * as functions from "firebase-functions";
import addNewAppointmentHandler from "./admin/AddNewAppointmentHandler";
import deleteAppointmentsHandler from "./admin/DeleteAppointmentsHandler";
import * as admin from "firebase-admin";
import { handler } from "./RequestHandleWrapper";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

export const addNewAppointment = handler(addNewAppointmentHandler);
export const deleteAppointments = handler(deleteAppointmentsHandler);
