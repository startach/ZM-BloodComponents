import * as functions from "firebase-functions";
import addNewAppointmentHandler from "./admin/AddNewAppointmentHandler";
import deleteAppointmentsHandler from "./admin/DeleteAppointmentsHandler";
import saveAdminRequestHandler from "./admin/SaveAdminHandler";
import bookAppointmentHandler from "./donor/BookAppointmentHandler";
import * as admin from "firebase-admin";
import { handler } from "./RequestHandleWrapper";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Admin
export const addNewAppointment = handler(addNewAppointmentHandler);
export const deleteAppointments = handler(deleteAppointmentsHandler);
export const saveAdmin = handler(saveAdminRequestHandler);

// Donor
export const bookAppointment = handler(bookAppointmentHandler);
