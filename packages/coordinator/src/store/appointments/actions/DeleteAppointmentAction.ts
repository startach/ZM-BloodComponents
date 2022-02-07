import * as actionTypes from "../AppointmentsActionTypes";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";

export function deleteAppointment(appointmentId: string) {
  CoordinatorFunctions.deleteAppointment(appointmentId);
  return {
    type: actionTypes.DELETE_APPOINTMENT,
    appointmentId: appointmentId,
  };
}
