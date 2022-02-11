import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { signOut } from "../../../firebase/FirebaseAuthentication";
import { setCoordinator } from "../CoordinatorActions";
import { setHospital } from "../../appointments/actions/SetHospitalAction";

export const fetchCoordinatorAndAppointments =
  (): ThunkAction => async (dispatch) => {
    const coordinator = await CoordinatorFunctions.getCoordinator();
    if (!coordinator) {
      signOut();
      return;
    }

    dispatch(setCoordinator(coordinator));
    dispatch(setHospital(coordinator.activeHospitalsForCoordinator[0]));
  };
