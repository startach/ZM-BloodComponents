import {
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { GetBookedDonationsInHospitalRequest } from "common/src/functions-api";
import { getFunctions, httpsCallable } from "firebase/functions";

function getCallableFunction(functionName: string) {
  const functions = getFunctions();
  return httpsCallable(functions, functionName);
}

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

export async function addNewAppointment(
  hospital: Hospital,
  donationStartTime: Date,
  slots: number
) {
  const callableFunction = getCallableFunction(
    FunctionsApi.AddNewAppointmentsFunctionName
  );

  const slot: FunctionsApi.NewSlotsRequest = {
    hospital: hospital,
    slots: slots,
    donationStartTimeMillis: donationStartTime.getTime(),
  };

  const request: FunctionsApi.AddAppointmentsRequest = {
    slotsRequests: [slot],
  };

  await callableFunction(request);
}

export async function getAppointments(
  hospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT,
  earliestStartTimeMillis: number,
  latestStartTimeMillis?: number
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

export function removeDonorFromAppointment(appointmentId: string) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentId,
    onlyRemoveDonor: true,
  };

  return callDeleteAppointmentFunction(request);
}

export function deleteAppointment(appointmentId: string) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentId,
    onlyRemoveDonor: false,
  };

  return callDeleteAppointmentFunction(request);
}

async function callDeleteAppointmentFunction(
  request: FunctionsApi.DeleteAppointmentRequest
) {
  const deleteAppointmentsFunction = getCallableFunction(
    FunctionsApi.DeleteAppointmentsFunctionName
  );

  await deleteAppointmentsFunction(request);
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

export async function getBookedAppointmentsInHospital(
  request: GetBookedDonationsInHospitalRequest
) {
  const getBookedAppointmentsInHospital = getCallableFunction(
    FunctionsApi.GetBookedDonationsInHospitalFunctionName
  );

  const response = await getBookedAppointmentsInHospital(request);
  const data =
    response.data as FunctionsApi.GetBookedDonationsInHospitalResponse;
  return data.donationsWithDonorDetails;
}

export async function bookManualDonation(
  request: FunctionsApi.CoordinatorBookAppointmentRequest
) {
  const callableFunction = getCallableFunction(
    FunctionsApi.CoordinatorBookAppointmentFunctionName
  );

  await callableFunction(request);
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
