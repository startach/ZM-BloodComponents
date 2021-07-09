import AppRouter from "./navigation/AppRouter";
import WithGlobalTheme from "./HOCs/withGlobalTheme";
import Div100vh from "react-div-100vh";
import { AvailableAppointmentsStore } from "./state/AvailableAppointmentsStore";
import { AvailableAppointmentsProvider } from "./state/Providers";

export default function DonorApp() {
  const availableAppointmentsState = new AvailableAppointmentsStore();

  return (
    <Div100vh>
      <WithGlobalTheme>
        <AvailableAppointmentsProvider value={availableAppointmentsState}>
          <AppRouter />
        </AvailableAppointmentsProvider>
      </WithGlobalTheme>
    </Div100vh>
  );
}
