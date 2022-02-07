import { Coordinator } from "@zm-blood-components/common";
import { LOGGED_OUT } from "../login/LoginActionTypes";
import * as actionTypes from "./CoordinatorActionTypes";

export interface CoordinatorState {
  coordinator?: Coordinator;
}

const initialState: CoordinatorState = { coordinator: undefined };

const reducer = (state = initialState, action: any = {}): CoordinatorState => {
  switch (action.type) {
    case actionTypes.SET_COORDINATOR:
      return {
        coordinator: action.coordinator,
      };

    case LOGGED_OUT:
      return {
        coordinator: undefined,
      };

    default:
      return state;
  }
};

export default reducer;
