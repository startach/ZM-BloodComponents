import { RootState } from "../store";
import { Hospital } from "@zm-blood-components/common";

export const getAvailableHospitals = (state: RootState): Hospital[] =>
  state.coordinator.coordinator
    ? state.coordinator.coordinator.activeHospitalsForCoordinator
    : [];
