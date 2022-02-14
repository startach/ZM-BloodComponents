import { ThunkAction } from "../../store";
import * as CoordinatorFunctions from "../../../firebase/CoordinatorFunctions";
import { signOut } from "../../../firebase/FirebaseAuthentication";
import { setCoordinator } from "../CoordinatorActions";
import { clearAndFetchAppointments } from "../../appointments/actions/InsertAppointmentsActions";

export const fetchCoordinatorAndAppointments =
  (): ThunkAction => async (dispatch) => {
    const coordinator = await CoordinatorFunctions.getCoordinator();
    if (!coordinator) {
      signOut();
      return;
    }

    dispatch(setCoordinator(coordinator));
    dispatch(
      clearAndFetchAppointments(
        coordinator.activeHospitalsForCoordinator[0],
        new Date()
      )
    );
  };
