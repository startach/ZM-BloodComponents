import { useEffect, useState } from "react";
import {
  Donor,
  Hospital,
  HospitalUtils,
  FunctionsApi,
} from "@zm-blood-components/common";
import Select from "../../components/Select";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ManageAppointmentsScreen from "./ManageAppointmentsScreen";
import { groupAppointmentDays } from "./CoordinatorAppointmentsGrouper";

export default function ManageAppointmentsScreenContainer() {
  const [hospitalFilter, setHospitalFilter] = useState<Hospital | "">("");
  const [appointmentsResponse, setAppointmentsResponse] = useState(
    getDefaultState()
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAppointmentsResponse(getDefaultState());
    if (!hospitalFilter) {
      return;
    }
    setIsLoading(true);
    CoordinatorFunctions.getAppointments(hospitalFilter).then((res) => {
      setAppointmentsResponse(res);
      setIsLoading(false);
    });
  }, [hospitalFilter]);

  const onDeleteAvailableAppointment = (appointmentId: string) => {
    setAppointmentsResponse({
      ...appointmentsResponse,
      appointments: appointmentsResponse.appointments.filter(
        (x) => x.id !== appointmentId
      ),
    });
    return CoordinatorFunctions.deleteAppointment(appointmentId);
  };

  const donationDays = groupAppointmentDays(
    appointmentsResponse.appointments,
    appointmentsResponse.donorsInAppointments
  );

  return (
    <div>
      <Select
        id={"hospital"}
        label={"בית חולים"}
        options={HospitalUtils.getAllHospitalOptions("בחר")}
        value={hospitalFilter}
        onChange={setHospitalFilter}
      />

      <ManageAppointmentsScreen
        donationDays={donationDays}
        onDeleteAvailableAppointment={onDeleteAvailableAppointment}
        isLoading={isLoading}
      />
    </div>
  );
}

function getDefaultState(): {
  appointments: FunctionsApi.AppointmentApiEntry[];
  donorsInAppointments: Donor[];
} {
  return { appointments: [], donorsInAppointments: [] };
}
