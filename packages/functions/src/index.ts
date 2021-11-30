import * as functions from "firebase-functions";
import addNewAppointmentsHandler from "./coordinator/AddNewAppointmentsHandler";
import getCoordinatorHandler from "./coordinator/GetCoordinatorHandler";
import getCoordinatorAppointmentsHandler from "./coordinator/GetCoordinatorAppointmentsHandler";
import deleteAppointmentsHandler from "./coordinator/DeleteAppointmentsHandler";
import coordinatorBookAppointmentHandler from "./coordinator/CoordinatorBookAppointmentHandler";
import donorBookAppointmentHandler from "./donor/DonorBookAppointmentHandler";
import cancelAppointmentHandler from "./donor/CancelAppointmentHandler";
import completeAppointmentHandler from "./donor/CompleteAppointmentHandler";
import geDonorHandler from "./donor/GetDonorHandler";
import saveDonorHandler from "./donor/SaveDonorHandler";
import getAvailableAppointmentsHandler from "./donor/GetAvailableAppointmentsHandler";
import getDonorAppointmentsHandler from "./donor/GetDonorAppointmentsHandler";
import getDonorsHandler from "./coordinator/GetDonorsHandler";
import getBookedDonationsInHospitalHandler from "./reports/BookedDonationInHospitalReportHandler";
import * as admin from "firebase-admin";
import { handler, unauthenticatedHandler } from "./RequestHandleWrapper";
import { unsubscribeHandler } from "./notifications/UnsubscribeHandler";
import { completeAppointmentApi } from "./notifications/CompleteAppointmentApi";
import { jobHandler } from "./jobs/SchemaJobs";

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

// Coordinator
export const getCoordinator = handler(getCoordinatorHandler);
export const addNewAppointments = handler(addNewAppointmentsHandler);
export const getCoordinatorAppointments = handler(
  getCoordinatorAppointmentsHandler
);
export const deleteAppointments = handler(deleteAppointmentsHandler);
export const getDonors = handler(getDonorsHandler);
export const coordinatorBookAppointment = handler(
  coordinatorBookAppointmentHandler
);

// Reports
export const getBookedDonationsInHospital = handler(
  getBookedDonationsInHospitalHandler
);

// Donor
export const bookAppointment = handler(donorBookAppointmentHandler);
export const cancelAppointment = handler(cancelAppointmentHandler);
export const completeAppointment = handler(completeAppointmentHandler);
export const completeAppointmentApiHandler = completeAppointmentApi;
export const getDonor = handler(geDonorHandler);
export const saveDonor = handler(saveDonorHandler);
export const getAvailableAppointments = unauthenticatedHandler(
  getAvailableAppointmentsHandler
);
export const getDonorAppointments = handler(getDonorAppointmentsHandler);
export const unsubscribe = unsubscribeHandler;

// Jobs
export const jobs = jobHandler;
