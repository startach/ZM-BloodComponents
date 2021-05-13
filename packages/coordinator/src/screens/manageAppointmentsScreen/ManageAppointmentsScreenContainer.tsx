import { useEffect, useState } from "react";
import {
  Donor,
  Hospital,
  HospitalUtils,
  FunctionsApi,
} from "@zm-blood-components/common";
import * as AppointmentUtils from "../../utils/AppointmentUtils";
import Select from "../../components/Select";
import { Restore, NewReleases } from "@material-ui/icons";
import Button, { ButtonVariant } from "../../components/Button";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ManageAppointmentsScreen from "./ManageAppointmentsScreen";
import { groupAppointmentDays } from "./CoordinatorAppointmentsGrouper";
import styles from "./ManageAppointmentsScreenContainer.module.scss";

export default function ManageAppointmentsScreenContainer() {
  const [hospitalFilter, setHospitalFilter] = useState<Hospital | "">("");
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
        appointment.donationStartTimeMillis > new Date().getTime()
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
    <div>
      <div className={styles.hospital_picker_container}>
        <Select
          id={"hospital"}
          label={"בית חולים"}
          options={HospitalUtils.getAllHospitalOptions("בחר")}
          value={hospitalFilter}
          onChange={setHospitalFilter}
        />

        <Button
          title="שינויים חדשים"
          onClick={() => {
            setShowOnlyRecentChanges(!showOnlyRecentChanges);
            if (!showOnlyRecentChanges) {
              setShowPastAppointments(false);
            }
          }}
          endIcon={<NewReleases />}
          variant={
            showOnlyRecentChanges
              ? ButtonVariant.contained
              : ButtonVariant.outlined
          }
        />
        <Button
          title="תורים שעברו"
          onClick={() => {
            setShowPastAppointments(!showPastAppointments);
          }}
          endIcon={<Restore />}
          isDisabled={showOnlyRecentChanges}
          variant={
            showPastAppointments
              ? ButtonVariant.contained
              : ButtonVariant.outlined
          }
        />
      </div>

      <ManageAppointmentsScreen
        donationDays={donationDays}
        onDeleteAppointment={onDeleteAppointment}
        onRemoveDonor={onRemoveDonor}
        isLoading={isLoading}
        showOnlyRecentChanges={showOnlyRecentChanges}
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
