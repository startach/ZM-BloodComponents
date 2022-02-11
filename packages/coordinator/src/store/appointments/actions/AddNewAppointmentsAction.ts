import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { setAppointments } from "./SetAppointmentsAction";
import { getHospital } from "../selectors/GetHospitalSelector";

export const addNewAppointments =
  (donationStartTimes: number[], onDone: () => void): ThunkAction =>
  async (dispatch, getState) => {
    const hospital = getHospital(getState());
    if (!hospital) {
      throw Error("Can't add appointments without hospital");
    }

    const addedAppointments = await CoordinatorFunctions.addNewAppointment(
      hospital,
      donationStartTimes
    );

    dispatch(setAppointments(addedAppointments));
    onDone();
  };
