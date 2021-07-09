import { AvailableAppointment } from "@zm-blood-components/common";
import { makeAutoObservable } from "mobx";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";

export class AvailableAppointmentsStore {
  availableAppointments: AvailableAppointment[] = [];
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFetchingStarted() {
    this.isFetching = true;
  }

  setAvailableAppointments(availableAppointments: AvailableAppointment[]) {
    this.availableAppointments = availableAppointments;
    this.isFetching = false;
  }
}

export async function refreshAvailableAppointments(
  store: AvailableAppointmentsStore
) {
  store.setFetchingStarted();
  const newAvailableAppointments =
    await FirebaseFunctions.getAvailableAppointments();
  store.setAvailableAppointments(newAvailableAppointments);
}
