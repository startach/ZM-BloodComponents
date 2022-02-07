import { RootState } from "../../store";

export function isFetching(state: RootState): boolean {
  return state.appointments.isFetching;
}
