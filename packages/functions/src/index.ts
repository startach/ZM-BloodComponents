import * as functions from "firebase-functions";
import addNewAppointmentsHandler from "./coordinator/AddNewAppointmentsHandler";
import getCoordinatorHandler from "./coordinator/GetCoordinatorHandler";
import getCoordinatorAppointmentsHandler from "./coordinator/GetCoordinatorAppointmentsHandler";
import deleteAppointmentsHandler from "./coordinator/DeleteAppointmentsHandler";
import saveAdminRequestHandler from "./coordinator/SaveCoordinatorHandler";
import bookAppointmentHandler from "./donor/BookAppointmentHandler";
import cancelAppointmentHandler from "./donor/CancelAppointmentHandler";
import confirmAppointmentHandler from "./donor/ConfirmAppointmentHandler";
import geDonorHandler from "./donor/GetDonorHandler";
import saveDonorHandler from "./donor/SaveDonorHandler";
import getAvailableAppointmentsHandler from "./donor/GetAvailableAppointmentsHandler";
import getDonorAppointmentsHandler from "./donor/GetDonorAppointmentsHandler";
import getDonorsHandler from "./coordinator/GetDonorsHandler";
import getBookedDonationsInHospitalHandler from "./reports/BookedDonationInHospitalReportHandler";
import * as admin from "firebase-admin";
import { handler, unauthenticatedHandler } from "./RequestHandleWrapper";
import { unsubscribeHandler } from "./notifications/UnsubscribeHandler";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Coordinator
export const getCoordinator = handler(getCoordinatorHandler);
export const addNewAppointments = handler(addNewAppointmentsHandler);
export const getCoordinatorAppointments = handler(
  getCoordinatorAppointmentsHandler
);
export const deleteAppointments = handler(deleteAppointmentsHandler);
export const saveCoordinator = handler(saveAdminRequestHandler);
export const getDonors = handler(getDonorsHandler);

// Reports
export const getBookedDonationsInHospital = handler(
  getBookedDonationsInHospitalHandler
);

// Donor
export const bookAppointment = handler(bookAppointmentHandler);
export const cancelAppointment = handler(cancelAppointmentHandler);
export const confirmedAppointment = handler(confirmAppointmentHandler);
export const getDonor = handler(geDonorHandler);
export const saveDonor = handler(saveDonorHandler);
export const getAvailableAppointments = unauthenticatedHandler(
  getAvailableAppointmentsHandler
);
export const getDonorAppointments = handler(getDonorAppointmentsHandler);
export const unsubscribe = unsubscribeHandler;
