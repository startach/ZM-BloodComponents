import * as actionTypes from "./LoginActionTypes";
import { LoginStatus } from "@zm-blood-components/common";

export function setLoginStatus(status: LoginStatus) {
  switch (status) {
    case LoginStatus.UNKNOWN:
      return { type: actionTypes.UNKNOWN_LOGIN_STATUS };
    case LoginStatus.LOGGED_IN:
      return { type: actionTypes.LOGGED_IN };
    case LoginStatus.LOGGED_OUT:
      return { type: actionTypes.LOGGED_OUT };
  }
}
