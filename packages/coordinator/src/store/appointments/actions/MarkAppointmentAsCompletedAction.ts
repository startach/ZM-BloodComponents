import { AppointmentStatus } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { ThunkAction } from "../../store";
import { insertAppointmentsToState } from "./InsertAppointmentsActions";
import { getAppointmentById } from "../selectors/GetAppointmentByIdSelector";

export const markAppointmentAsCompleted =
  (appointmentId: string, isNoShow: boolean): ThunkAction =>
  (dispatch, getState) => {
    const appointment = getAppointmentById(getState())(appointmentId);
    if (!appointment) {
      console.warn("Trying to mark missing appointment", appointmentId);
      return;
    }

    appointment.status = isNoShow
      ? AppointmentStatus.NOSHOW
      : AppointmentStatus.COMPLETED;

    CoordinatorFunctions.markAppointmentAsCompleted(appointmentId, isNoShow);

    dispatch(insertAppointmentsToState([appointment]));
  };
