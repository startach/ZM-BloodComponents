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
  const data = response.data as FunctionsApi.BookAppointmentResponse;
  return data.bookedAppointment;
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

export function saveDonor(
  firstName: string,
  lastName: string,
  birthDate: string,
  phone: string,
  bloodType: BloodType
): Donor {
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
  };

  saveDonorFunction(request).catch((e) => console.error(e));
  return {
    id: currentUser.uid,
    email: currentUser.email,
    firstName,
    lastName,
    phone,
    bloodType,
    birthDate,
  };
}

export async function getDonor(): Promise<Donor | undefined> {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return undefined;
  }

  const getDonorFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetDonorFunctionName);

  const request: FunctionsApi.GetDonorRequest = {
    donorId: currentUser.uid,
  };

  try {
    const response = await getDonorFunction(request);
    const data = response.data as FunctionsApi.GetDonorResponse;
    return data.donor;
  } catch (e) {
    console.error("Error getting donor", e);
    return undefined;
  }
}

export async function getBookedAppointment(): Promise<
  BookedAppointment | undefined
> {
  const response = await getDonorAppointments(new Date());
  if (response.futureAppointments.length === 0) {
    return undefined;
  }
  return response.futureAppointments[0];
}

export async function getPastAppointments(): Promise<BookedAppointment[]> {
  const response = await getDonorAppointments(undefined, new Date());
  return response.completedAppointments;
}

async function getDonorAppointments(
  fromTime?: Date,
  toTime?: Date
): Promise<FunctionsApi.GetDonorAppointmentsResponse> {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return {
      completedAppointments: [],
      futureAppointments: [],
    };
  }

  const getDonorAppointmentsFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.GetDonorAppointmentsFunctionName);

  const request: FunctionsApi.GetDonorAppointmentsRequest = {
    donorId: currentUser.uid,
  };

  if (fromTime) {
    request.fromMillis = fromTime.getTime();
  }

  if (toTime) {
    request.toMillis = toTime.getTime();
  }

  try {
    const response = await getDonorAppointmentsFunction(request);
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      completedAppointments: [],
      futureAppointments: [],
    };
  }
}
