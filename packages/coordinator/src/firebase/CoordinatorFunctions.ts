import firebase from "firebase/app";
import "firebase/functions";
import { FunctionsApi } from "@zm-blood-components/common";
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
