import { RootState } from "../../store";

export function isFetching(state: RootState): boolean {
  return state.appointments.isFetching;
}

export function getEarliestTimeFetched(state: RootState): number {
  const res = state.appointments.earliestTimeFetched;
  if (res <= 0) {
    throw new Error("Invalid earliest time");
  }

  return res;
}

export function getLatestTimeFetched(state: RootState): number {
  const res = state.appointments.latestTimeFetched;
  if (res <= 0) {
    throw new Error("Invalid latest time");
  }

  return res;
}
