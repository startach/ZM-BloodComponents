import firebase from "firebase/app";
import "firebase/functions";
import { FunctionsApi, Hospital } from "@zm-blood-components/common";
import { NewSlots } from "../screens/addAppointments/AddAppointmentsScreenContainer";

export async function addNewAppointments(newSlots: NewSlots[]) {
  const addNewAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.AddNewAppointmentsFunctionName);

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

export async function getAppointments(hospital: Hospital) {
  const getAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetCoordinatorAppointmentsFunctionName);

  const request: FunctionsApi.GetCoordinatorAppointmentsRequest = {
    hospital,
  };

  const response = await getAppointmentsFunction(request);
  const data = response.data as FunctionsApi.GetCoordinatorAppointmentsResponse;
  return data;
}

export async function deleteAppointment(appointmentId: string) {
  const deleteAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.DeleteAppointmentsFunctionName);

  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentIds: [appointmentId],
  };

  await deleteAppointmentsFunction(request);
}
