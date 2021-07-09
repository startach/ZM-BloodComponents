import { Context, createContext, useContext } from "react";
import { AvailableAppointmentsStore } from "./AvailableAppointmentsStore";
import { AppointmentToBookStore } from "./AppointmentToBookStore";

const AvailableAppointmentsContext: Context<
  AvailableAppointmentsStore | undefined
> = createContext<AvailableAppointmentsStore | undefined>(undefined);

export const AvailableAppointmentsProvider =
  AvailableAppointmentsContext.Provider;

export const useAvailableAppointmentsStore = (): AvailableAppointmentsStore => {
  const context = useContext(AvailableAppointmentsContext);
  if (context === undefined) {
    throw new Error("AvailableAppointments context must be initialized!");
  }
  return context;
};

const AppointmentToBookContext: Context<AppointmentToBookStore | undefined> =
  createContext<AppointmentToBookStore | undefined>(undefined);

export const AppointmentToBookProvider = AppointmentToBookContext.Provider;

export const useAppointmentToBookStore = (): AppointmentToBookStore => {
  const context = useContext(AppointmentToBookContext);
  if (context === undefined) {
    throw new Error("AppointmentToBook context must be initialized!");
  }
  return context;
};
