import {
  BloodType,
  BookedAppointment,
  AppointmentStatus,
  Donor,
  FunctionsApi,
} from "@zm-blood-components/common";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

export const APPROVE_HISTOEY_LENGTH_DAYS = 30;

export function getCallableFunction(functionName: string) {
  const functions = getFunctions();
  return httpsCallable(functions, functionName);
}

export function getAvailableAppointments() {
  const getAvailableAppointmentsFunction = getCallableFunction(
    FunctionsApi.GetAvailableAppointmentsFunctionName
  );
  return getAvailableAppointmentsFunction().then((res) => {
    const response = res.data as FunctionsApi.GetAvailableAppointmentsResponse;
    return response.availableAppointments;
  });
}

export async function donorBookAppointment(appointmentIds: string[]) {
  const donorBookAppointmentFunction = getCallableFunction(
    FunctionsApi.DonorBookAppointmentFunctionName
  );

  const request: FunctionsApi.BookAppointmentRequest = {
    appointmentIds,
  };

  const response = await donorBookAppointmentFunction(request);
  return response.data as FunctionsApi.BookAppointmentResponse;
}

export async function donorSwapAppointment(bookAppointmentIds: string[], cancelAppointmentId: string) {
  const donorSwapAppointmentFunction = getCallableFunction(
    FunctionsApi.DonorSwapAppointmentFunctionName
  );

  const request: FunctionsApi.SwapAppointmentRequest = {
    bookAppointmentIds,
    cancelAppointmentId
  };

  const response = await donorSwapAppointmentFunction(request);
  return response.data as FunctionsApi.SwapAppointmentResponse;
}

export async function setCompleteAppointment(
  appointmentId: string,
  isNoshow: boolean
) {
  const completeAppointmentFunction = getCallableFunction(
    FunctionsApi.CompleteAppointmentFunctionName
  );

  const request: FunctionsApi.CompleteAppointmentRequest = {
    appointmentId: appointmentId,
    isNoshow: isNoshow,
  };

  const response = await completeAppointmentFunction(request);
  return response;
}

// Remove donor from appointment
export async function cancelAppointment(appointmentId: string) {
  const cancelAppointmentFunction = getCallableFunction(
    FunctionsApi.CancelAppointmentFunctionName
  );

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
  const currentUser = getAuth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    throw Error("Unauthorized to update user");
  }

  const saveDonorFunction = getCallableFunction(
    FunctionsApi.SaveDonorFunctionName
  );

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
  pendingCompletionAppointments: BookedAppointment[];
}> {
  const currentUser = getAuth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return {
      pendingCompletionAppointments: [],
    };
  }

  const getDonorFunction = getCallableFunction(
    FunctionsApi.GetDonorAppointmentsFunctionName
  );
  const today = new Date().getDate();
  const fromMillis = new Date().setDate(today - APPROVE_HISTOEY_LENGTH_DAYS);

  const request: FunctionsApi.GetDonorAppointmentsRequest = {
    donorId: currentUser.uid,
    fromMillis: fromMillis,
  };

  try {
    const response = await getDonorFunction(request);
    const data = response.data as FunctionsApi.GetDonorAppointmentsResponse;

    const pendingCompletionAppointments = data.completedAppointments.filter(
      (appointment) => appointment.status === AppointmentStatus.BOOKED
    );

    return {
      donor: data.donor,
      bookedAppointment:
        data.futureAppointments.length !== 0
          ? data.futureAppointments[0]
          : undefined,
      pendingCompletionAppointments: pendingCompletionAppointments,
    };
  } catch (e) {
    console.error("Error getting donor", e);
    return { pendingCompletionAppointments: [] };
  }
}
