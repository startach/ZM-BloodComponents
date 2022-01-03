import { useEffect, useState } from "react";
import {
  DateUtils,
  Donor,
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import * as AppointmentUtils from "../../utils/AppointmentUtils";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ManageAppointmentsScreen from "./ManageAppointmentsScreen";
import { groupAppointmentDays } from "./CoordinatorAppointmentsGrouper";

interface ManageAppointmentsScreenContainerProps {
  activeHospitalsForCoordinator: Hospital[];
}

export default function ManageAppointmentsScreenContainer({
  activeHospitalsForCoordinator,
}: ManageAppointmentsScreenContainerProps) {
  const [hospitalFilter, setHospitalFilter] =
    useState<HospitalUtils.HospitalOptionKey>(
      activeHospitalsForCoordinator.length === 1
        ? activeHospitalsForCoordinator[0]
        : ""
    );
  const [appointmentsResponse, setAppointmentsResponse] = useState(
    getDefaultState()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showOnlyRecentChanges, setShowOnlyRecentChanges] = useState(false);
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

  const onDeleteAppointment = (appointmentId: string) => {
    setAppointmentsResponse({
      ...appointmentsResponse,
      appointments: appointmentsResponse.appointments.filter(
        (x) => x.id !== appointmentId
      ),
    });
    return CoordinatorFunctions.deleteAppointment(appointmentId);
  };

  const onRemoveDonor = (appointmentId: string) => {
    setAppointmentsResponse({
      ...appointmentsResponse,
      appointments: appointmentsResponse.appointments.map((appointment) => {
        if (appointment.id !== appointmentId) {
          return appointment;
        }
        return AppointmentUtils.removeDonorFromAppointment(appointment);
      }),
    });
    return CoordinatorFunctions.removeDonorFromAppointment(appointmentId);
  };

  let shownAppointments = appointmentsResponse.appointments;

  if (!showPastAppointments) {
    shownAppointments = shownAppointments.filter(
      (appointment) =>
        appointment.donationStartTimeMillis >
        DateUtils.TodayAdMidnight().getTime()
    );

    if (showOnlyRecentChanges) {
      shownAppointments = shownAppointments.filter(
        (a) => a.recentChangeType || a.recentChangeType === 0
      );
    }
  }

  const donationDays = groupAppointmentDays(
    shownAppointments,
    appointmentsResponse.donorsInAppointments
  );

  return (
    <ManageAppointmentsScreen
      donationDays={donationDays}
      onDeleteAppointment={onDeleteAppointment}
      onRemoveDonor={onRemoveDonor}
      isLoading={isLoading}
      showOnlyRecentChanges={showOnlyRecentChanges}
      setShowOnlyRecentChanges={setShowOnlyRecentChanges}
      hospitalFilter={hospitalFilter}
      setHospitalFilter={setHospitalFilter}
      showPastAppointments={showPastAppointments}
      setShowPastAppointments={setShowPastAppointments}
      activeHospitalsForCoordinator={activeHospitalsForCoordinator}
    />
  );
}

function getDefaultState(): {
  appointments: FunctionsApi.AppointmentApiEntry[];
  donorsInAppointments: Donor[];
} {
  return { appointments: [], donorsInAppointments: [] };
}
