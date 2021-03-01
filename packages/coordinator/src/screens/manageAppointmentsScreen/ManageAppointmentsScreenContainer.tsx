import React, { useEffect, useState } from "react";
import {
  Donor,
  Hospital,
  HospitalUtils,
  FunctionsApi,
} from "@zm-blood-components/common";
import Select from "../../components/Select";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ManageAppointmentsScreen from "./ManageAppointmentsScreen";

export default function ManageAppointmentsScreenContainer() {
  const [hospitalFilter, setHospitalFilter] = useState<Hospital | "">("");
  const [appointmentsResponse, setAppointmentsResponse] = useState(
    getDefaultState()
  );

  useEffect(() => {
    setAppointmentsResponse(getDefaultState());
    if (!hospitalFilter) {
      return;
    }

    CoordinatorFunctions.getAppointments(hospitalFilter).then((res) =>
      setAppointmentsResponse(res)
    );
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
        appointments={appointmentsResponse.appointments}
        donorsInAppointments={appointmentsResponse.donorsInAppointments}
        onDeleteAvailableAppointment={onDeleteAvailableAppointment}
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
