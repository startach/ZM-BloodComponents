import { LoginStatus } from "@zm-blood-components/common";
import * as actionTypes from "./LoginActionTypes";

export interface LoggedInState {
  loginStatus: LoginStatus;
}

const initialState: LoggedInState = { loginStatus: LoginStatus.UNKNOWN };

const reducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case actionTypes.UNKNOWN_LOGIN_STATUS:
      return {
        loginStatus: LoginStatus.UNKNOWN,
      };

    case actionTypes.LOGGED_IN:
      return {
        loginStatus: LoginStatus.LOGGED_IN,
      };

    case actionTypes.LOGGED_OUT:
      return {
        loginStatus: LoginStatus.LOGGED_OUT,
      };

    default:
      return state;
  }
};

export default reducer;
