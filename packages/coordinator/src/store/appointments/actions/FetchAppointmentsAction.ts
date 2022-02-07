import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { setAppointments } from "./SetAppointmentsAction";
import { Hospital } from "@zm-blood-components/common";

export const fetchAppointments =
  (
    hospital: Hospital,
    earliestStartTimeMillis: number,
    latestStartTimeMillis: number
  ): ThunkAction =>
  async (dispatch, getState) => {
    const appointmentsResponse = await CoordinatorFunctions.getAppointments(
      hospital,
      earliestStartTimeMillis,
      latestStartTimeMillis
    );

    dispatch(setAppointments(appointmentsResponse.appointments));
  };
