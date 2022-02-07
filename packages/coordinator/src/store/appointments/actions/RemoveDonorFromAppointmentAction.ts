import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { setAppointments } from "./SetAppointmentsAction";
import { getAppointmentById } from "../selectors/GetAppointmentByIdSelector";
import {
  AppointmentStatus,
  AvailableAppointment,
  BookingChange,
} from "@zm-blood-components/common";

export const removeDonorFromAppointment =
  (appointmentId: string): ThunkAction =>
  async (dispatch, getState) => {
    const appointment = getAppointmentById(getState())(appointmentId);
    if (!appointment || !appointment.booked) {
      throw Error("Can't remove donor from missing appointment");
    }

    CoordinatorFunctions.removeDonorFromAppointment(appointmentId);

    // Changing the appointment locally to insert it to app state as available
    const availableAppointment: AvailableAppointment = {
      id: appointment.id,
      booked: false,
      status: AppointmentStatus.AVAILABLE,
      hospital: appointment.hospital,
      donationStartTimeMillis: appointment.donationStartTimeMillis,
      recentChangeType: BookingChange.CANCELLED,
    };
    dispatch(setAppointments([availableAppointment]));
  };
