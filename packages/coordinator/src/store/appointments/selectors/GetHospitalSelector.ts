import { RootState } from "../../store";
import { Hospital } from "@zm-blood-components/common";

export function getHospital(state: RootState): Hospital {
  return state.appointments.hospital || Hospital.ICHILOV; // TODO remove this
}
