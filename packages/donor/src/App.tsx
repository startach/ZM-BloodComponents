import AppRouter from "./navigation/AppRouter";
import WithGlobalTheme from "./HOCs/withGlobalTheme";
import Div100vh from "react-div-100vh";
import { AvailableAppointmentsStore } from "./state/AvailableAppointmentsStore";
import {
  AppointmentToBookProvider,
  AvailableAppointmentsProvider,
} from "./state/Providers";
import { AppointmentToBookStore } from "./state/AppointmentToBookStore";

export default function DonorApp() {
  const appointmentToBookStore = new AppointmentToBookStore();
  const availableAppointmentsStore = new AvailableAppointmentsStore();

  return (
    <Div100vh>
      <WithGlobalTheme>
        <AppointmentToBookProvider value={appointmentToBookStore}>
          <AvailableAppointmentsProvider value={availableAppointmentsStore}>
            <AppRouter />
          </AvailableAppointmentsProvider>
        </AppointmentToBookProvider>
      </WithGlobalTheme>
    </Div100vh>
  );
}
