import firebase from "firebase/app";
import "firebase/functions";
import {
  BloodType,
  BookedAppointment,
  Donor,
  FunctionsApi,
} from "@zm-blood-components/common";

export function getAvailableAppointments() {
  const getAvailableAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetAvailableAppointmentsFunctionName);
  return getAvailableAppointmentsFunction().then((res) => {
    const response = res.data as FunctionsApi.GetAvailableAppointmentsResponse;
    return response.availableAppointments;
  });
}

export async function bookAppointment(appointmentIds: string[]) {
  const bookAppointmentFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.BookAppointmentFunctionName);

  const request: FunctionsApi.BookAppointmentRequest = {
    appointmentIds,
  };

  const response = await bookAppointmentFunction(request);
  return response.data as FunctionsApi.BookAppointmentResponse;
}

// Remove donor from appointment
export async function cancelAppointment(appointmentId: string) {
  const cancelAppointmentFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.CancelAppointmentFunctionName);

  const request: FunctionsApi.CancelAppointmentRequest = {
    appointmentId,
  };

  await cancelAppointmentFunction(request);
}

export async function saveDonor(
  firstName: string,
  lastName: string,
  birthDate: string,
  phone: string,
  bloodType: BloodType,
  enableEmailNotifications: boolean
): Promise<Donor> {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    throw Error("Unauthorized to update user");
  }

  const saveDonorFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.SaveDonorFunctionName);

  const request: FunctionsApi.SaveDonorRequest = {
    id: currentUser.uid,
    email: currentUser.email,
    firstName,
    lastName,
    phone,
    bloodType,
    birthDate,
    notificationSettings: {
      disableEmailNotifications: !enableEmailNotifications,
    },
  };

  const res = await saveDonorFunction(request);
  const data = res.data as FunctionsApi.SaveDonorResponse;
  return data.donor;
}

export async function getDonorDetails(): Promise<{
  donor?: Donor;
  bookedAppointment?: BookedAppointment;
}> {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return {};
  }

  const getDonorFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetDonorAppointmentsFunctionName);

  const request: FunctionsApi.GetDonorAppointmentsRequest = {
    donorId: currentUser.uid,
    fromMillis: new Date().getTime(),
  };

  try {
    const response = await getDonorFunction(request);
    const data = response.data as FunctionsApi.GetDonorAppointmentsResponse;

    if (data.futureAppointments.length === 0) {
      return { donor: data.donor };
    }
    return {
      donor: data.donor,
      bookedAppointment: data.futureAppointments[0],
    };
  } catch (e) {
    console.error("Error getting donor", e);
    return {};
  }
}
