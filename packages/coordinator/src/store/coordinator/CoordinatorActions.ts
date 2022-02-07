import * as actionTypes from "./CoordinatorActionTypes";
import { Coordinator } from "@zm-blood-components/common";

export function setCoordinator(coordinator: Coordinator) {
  return { type: actionTypes.SET_COORDINATOR, coordinator };
}
