import {
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { getFunctions, httpsCallable } from "firebase/functions";

function getCallableFunction(functionName: string) {
  const functions = getFunctions();
  return httpsCallable(functions, functionName);
}

/*
 * Fetching
 */
export async function getCoordinator() {
  const getCoordinatorFunction = getCallableFunction(
    FunctionsApi.GetCoordinatorFunctionName
  );
  const request: FunctionsApi.GetCoordinatorRequest = {};

  try {
    const res = await getCoordinatorFunction(request);
    const data = res.data as FunctionsApi.GetCoordinatorResponse;
    return data.coordinator;
  } catch (e) {
    console.warn("User is not a coordinator");
    return undefined;
  }
}

export async function getAppointments(
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT,
  earliestStartTimeMillis: number,
  latestStartTimeMillis: number
) {
  const getAppointmentsFunction = getCallableFunction(
    FunctionsApi.GetCoordinatorAppointmentsFunctionName
  );

  const request: FunctionsApi.GetCoordinatorAppointmentsRequest = {
    hospital,
    earliestStartTimeMillis,
    latestStartTimeMillis,
  };

  const response = await getAppointmentsFunction(request);
  return response.data as FunctionsApi.GetCoordinatorAppointmentsResponse;
}

export async function getAllDonors() {
  const getDonorsFunction = getCallableFunction(
    FunctionsApi.GetDonorsFunctionName
  );

  const request: FunctionsApi.GetDonorsRequest = {};

  const response = await getDonorsFunction(request);
  const data = response.data as FunctionsApi.GetDonorsResponse;
  return data.donors;
}

export async function getBookedAppointment(appointmentId: string) {
  const request: FunctionsApi.GetBookedAppointmentRequest = {
    appointmentId,
  };

  const callableFunction = getCallableFunction(
    FunctionsApi.GetBookedAppointment
  );

  const response = await callableFunction(request);
  const data = response.data as FunctionsApi.GetBookedAppointmentResponse;
  return data.bookedAppointment;
}

export async function getReportsForHospital(
  request: GetBookedDonationsInHospitalRequest
) {
  const callableFunction = getCallableFunction(
    FunctionsApi.GetBookedDonationsInHospitalFunctionName
  );

  const response = await callableFunction(request);
  const data =
    response.data as FunctionsApi.GetBookedDonationsInHospitalResponse;
  return data.donationsWithDonorDetails;
}

/*
 * Do changes
 */
export async function addNewAppointment(
  hospital: Hospital,
  donationStartTimes: number[]
) {
  const callableFunction = getCallableFunction(
    FunctionsApi.AddNewAppointmentsFunctionName
  );

  const request: FunctionsApi.AddAppointmentsRequest = {
    hospital,
    donationStartTimes,
  };

  await callableFunction(request);
}

export function removeDonorFromAppointment(appointmentId: string) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentId,
    onlyRemoveDonor: true,
  };

  return deleteAppointmentInternal(request);
}

export function deleteAppointment(appointmentId: string) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentId,
    onlyRemoveDonor: false,
  };

  return deleteAppointmentInternal(request);
}

async function deleteAppointmentInternal(
  request: FunctionsApi.DeleteAppointmentRequest
) {
  const deleteAppointmentsFunction = getCallableFunction(
    FunctionsApi.DeleteAppointmentsFunctionName
  );

  await deleteAppointmentsFunction(request);
}

export async function bookManualDonation(
  request: FunctionsApi.CoordinatorBookAppointmentRequest
) {
  const callableFunction = getCallableFunction(
    FunctionsApi.CoordinatorBookAppointmentFunctionName
  );

  await callableFunction(request);
}

export async function markAppointmentAsCompleted(
  appointmentId: string,
  isNoShow: boolean
) {
  const request: FunctionsApi.CompleteAppointmentRequest = {
    appointmentId,
    isNoshow: isNoShow,
    callFromCoordinator: true,
  };

  const callableFunction = getCallableFunction(
    FunctionsApi.CompleteAppointmentFunctionName
  );

  const response = await callableFunction(request);
  const data = response.data as FunctionsApi.CompleteAppointmentResponse;
  return data.completedAppointment;
}
