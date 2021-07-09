import { Context, createContext, useContext } from "react";
import { AvailableAppointmentsStore } from "./AvailableAppointmentsStore";

const AvailableAppointmentsContext: Context<
  AvailableAppointmentsStore | undefined
> = createContext<AvailableAppointmentsStore | undefined>(undefined);

export const AvailableAppointmentsProvider =
  AvailableAppointmentsContext.Provider;

export const useAvailableAppointmentsStore = (): AvailableAppointmentsStore => {
  const context = useContext(AvailableAppointmentsContext);
  if (context === undefined) {
    throw new Error("FeedStore context must be initialized!");
  }
  return context;
};
