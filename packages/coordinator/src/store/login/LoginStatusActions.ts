import * as actionTypes from "./LoginActionTypes";
import { LoginStatus } from "@zm-blood-components/common";
import { ThunkAction } from "../store";
import { clearAndFetchAppointments } from "../appointments/actions/InsertAppointmentsActions";

export const setLoginStatus =
  (newLoginStatus: LoginStatus): ThunkAction =>
  (dispatch) => {
    dispatch(setLoginStatusInternal(newLoginStatus));
    if (newLoginStatus === LoginStatus.LOGGED_IN) {
      dispatch(clearAndFetchAppointments(undefined, new Date()));
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
