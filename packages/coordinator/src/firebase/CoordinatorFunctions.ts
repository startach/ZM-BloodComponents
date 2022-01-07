import {
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { NewSlots } from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { GetBookedDonationsInHospitalRequest } from "common/src/functions-api";
import { getFunctions, httpsCallable } from "firebase/functions";

export function getCallableFunction(functionName: string) {
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

export async function addNewAppointments(newSlots: NewSlots[]) {
  const addNewAppointmentsFunction = getCallableFunction(
    FunctionsApi.AddNewAppointmentsFunctionName
  );

  const newSlotsRequests: FunctionsApi.NewSlotsRequest[] = newSlots.map(
    (slots) => ({
      hospital: slots.hospital,
      slots: slots.slots,
      donationStartTimeMillis: slots.donationStartTime.getTime(),
    })
  );

  const request: FunctionsApi.AddAppointmentsRequest = {
    slotsRequests: newSlotsRequests,
  };

  await addNewAppointmentsFunction(request);
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

  deleteAppointmentsFunction(request);
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
