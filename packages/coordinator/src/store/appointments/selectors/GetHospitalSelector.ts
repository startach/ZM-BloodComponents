import { RootState } from "../../store";
import { Hospital } from "@zm-blood-components/common";

export function getHospital(state: RootState): Hospital | undefined {
  return state.appointments.hospital;
}
