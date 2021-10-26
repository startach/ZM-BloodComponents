import {
  BloodType,
  BookedAppointment,
  AppointmentStatus,
  Donor,
  FunctionsApi,
} from "@zm-blood-components/common";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

export function getCallableFunction(functionName: string) {
  const functions = getFunctions();
  return httpsCallable(functions, functionName);
}

export function getCompleteApointmentFunction(functionName: string) {
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

export async function bookAppointment(appointmentIds: string[]) {
  const bookAppointmentFunction = getCallableFunction(
    FunctionsApi.BookAppointmentFunctionName
  );

  const request: FunctionsApi.BookAppointmentRequest = {
    appointmentIds,
  };

  const response = await bookAppointmentFunction(request);
  return response.data as FunctionsApi.BookAppointmentResponse;
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

export async function getDonorDetails(fromMillis?: number): Promise<{
  donor?: Donor;
  bookedAppointment?: BookedAppointment;
  NotApprovedAppointment?: BookedAppointment[];
}> {
  const currentUser = getAuth().currentUser;

  if (!currentUser?.uid || !currentUser.email) {
    console.error("User not authenticated");
    return {};
  }

  const getDonorFunction = getCallableFunction(
    FunctionsApi.GetDonorAppointmentsFunctionName
  );

  const request: FunctionsApi.GetDonorAppointmentsRequest = {
    donorId: currentUser.uid,
    fromMillis: fromMillis ? fromMillis : new Date().getTime(),
  };

  try {
    const response = await getDonorFunction(request);
    const data = response.data as FunctionsApi.GetDonorAppointmentsResponse;

    let ret = { donor: data.donor };

    if (data.futureAppointments.length !== 0) {
      ret = Object.assign({ futureAppointments: data.futureAppointments }, ret);
    }

    const notApprovedAppointments = data.completedAppointments.filter(
      (appointment) => appointment.status === AppointmentStatus.BOOKED
    );
    if (notApprovedAppointments.length !== 0) {
      ret = Object.assign(
        { NotApprovedAppointment: notApprovedAppointments },
        ret
      );
    }

    return ret;
  } catch (e) {
    console.error("Error getting donor", e);
    return {};
  }
}
