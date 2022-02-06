import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { setAppointments } from "./SetAppointmentsAction";
import { getHospital } from "../selectors/GetHospitalSelector";

export const fetchAppointments =
  (
    earliestStartTimeMillis: number,
    latestStartTimeMillis: number
  ): ThunkAction =>
  async (dispatch, getState) => {
    const hospital = getHospital(getState());

    const appointmentsResponse = await CoordinatorFunctions.getAppointments(
      hospital,
      earliestStartTimeMillis,
      latestStartTimeMillis
    );

    dispatch(setAppointments(appointmentsResponse.appointments));
  };
