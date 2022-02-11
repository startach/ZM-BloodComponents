import * as actionTypes from "./LoginActionTypes";
import { LoginStatus } from "@zm-blood-components/common";
import { ThunkAction } from "../store";
import { fetchCoordinatorAndAppointments } from "../coordinator/actions/FetchCoordinatorAction";

export const setLoginStatus =
  (newLoginStatus: LoginStatus): ThunkAction =>
  (dispatch) => {
    dispatch(setLoginStatusInternal(newLoginStatus));
    if (newLoginStatus === LoginStatus.LOGGED_IN) {
      dispatch(fetchCoordinatorAndAppointments());
    }
  };

export function setLoginStatusInternal(status: LoginStatus) {
  switch (status) {
    case LoginStatus.UNKNOWN:
      return { type: actionTypes.UNKNOWN_LOGIN_STATUS };
    case LoginStatus.LOGGED_IN:
      return { type: actionTypes.LOGGED_IN };
    case LoginStatus.LOGGED_OUT:
      return { type: actionTypes.LOGGED_OUT };
  }
}
