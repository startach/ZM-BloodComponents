import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { insertAppointmentsToState } from "./InsertAppointmentsActions";
import { getAppointmentById } from "../selectors/GetAppointmentByIdSelector";
import {
  MinimalDonorDetailsForAppointment,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";

export const bookManualDonation =
  (
    appointmentId: string,
    donorDetails: MinimalDonorDetailsForAppointment,
    onDone: () => void
  ): ThunkAction =>
  async (dispatch, getState) => {
    const appointment = getAppointmentById(getState())(appointmentId);
    if (!appointment || appointment.booked) {
      throw Error("Can't manually book missing appointment");
    }

    const bookedAppointment = await CoordinatorFunctions.bookManualDonation({
      donorId: MANUAL_DONOR_ID, // TODO: Change firestore to accept donorDetails.appointment.donorId instead of "manual"
      appointmentIds: [appointmentId],
      donorDetails: donorDetails,
    });

    if (!bookedAppointment) {
      throw Error("Failed manually booking appointment " + appointmentId);
    }

    dispatch(insertAppointmentsToState([bookedAppointment]));
    onDone();
  };
