import { useEffect, useState } from "react";
import {
  Donor,
  Hospital,
  HospitalUtils,
  FunctionsApi,
  DateUtils,
} from "@zm-blood-components/common";
import Select from "../../components/Select";
import { Restore } from "@material-ui/icons";
import Button, { ButtonVariant } from "../../components/Button";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ManageAppointmentsScreen from "./ManageAppointmentsScreen";
import { groupAppointmentDays } from "./CoordinatorAppointmentsGrouper";

export default function ManageAppointmentsScreenContainer() {
  const [hospitalFilter, setHospitalFilter] = useState<Hospital | "">("");
  const [appointmentsResponse, setAppointmentsResponse] = useState(
    getDefaultState()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPastAppointments, setShowPastAppointments] = useState(false);

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

  let shownAppointments = appointmentsResponse.appointments;

  if (!showPastAppointments) {
    shownAppointments = shownAppointments.filter(
      (appointment) =>
        DateUtils.DateComparer(
          new Date(appointment.donationStartTimeMillis),
          new Date()
        ) > 0
    );
  }

  const donationDays = groupAppointmentDays(
    shownAppointments,
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

      <Button
        title="תורים שעברו"
        onClick={() => {
          setShowPastAppointments(!showPastAppointments);
        }}
        endIcon={<Restore />}
        variant={
          showPastAppointments
            ? ButtonVariant.contained
            : ButtonVariant.outlined
        }
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
