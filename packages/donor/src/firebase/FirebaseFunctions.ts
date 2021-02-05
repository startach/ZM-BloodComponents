import firebase from "firebase/app";
import "firebase/functions";
import {
  BloodType,
  FunctionsApi,
  AvailableAppointment,
} from "@zm-blood-components/common";

export function getAvailableAppointments() {
  const getAvailableAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetAvailableAppointmentsFunctionName);
  return getAvailableAppointmentsFunction().then((res) => {
    const response = res.data as FunctionsApi.GetAvailableAppointmentsResponse;
    const appointments = response.availableAppointments.map<AvailableAppointment>(
      (appointments) => ({
        id: appointments.id,
        donationStartTime: new Date(appointments.donationStartTimeMillis),
        hospital: appointments.hospital,
      })
    );
    return appointments;
  });
}

export function saveDonor(
  firstName: string,
  lastName: string,
  birthDate: string,
  phoneNumber: string,
  bloodType: BloodType
) {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return;
  }

  const saveDonorFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.SaveDonorFunctionName);

  const request: FunctionsApi.SaveDonorRequest = {
    id: currentUser.uid,
    email: currentUser.email,
    firstName,
    lastName,
    phone: phoneNumber,
    bloodType,
    birthDate,
  };

  saveDonorFunction(request).catch((e) => console.error(e));
}
