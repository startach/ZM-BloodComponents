import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { setAppointments } from "./SetAppointmentsAction";
import { getAppointmentById } from "../selectors/GetAppointmentByIdSelector";

export const removeDonorFromAppointment =
  (appointmentId: string): ThunkAction =>
  async (dispatch, getState) => {
    const appointment = getAppointmentById(getState())(appointmentId);
    if (!appointment) {
      throw Error("Can't remove donor from missing appointment");
    }

    CoordinatorFunctions.removeDonorFromAppointment(appointmentId);

    // TODO(yaron) remove the donor from the appointment
    dispatch(setAppointments([appointment]));
  };
