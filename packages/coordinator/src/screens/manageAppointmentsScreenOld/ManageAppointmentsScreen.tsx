import {
  DateUtils,
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";
import Spinner from "../../components/V2/Spinner";
import Popup from "../../components/V2/Popup";
import PopupFlashMessage from "../../components/V2/Popup/PopupFlashMessage";

import { useState } from "react";
import {
  AppointmentTableExpandedRowContent,
  MainAppointmentTableColumns,
} from "./ManageAppointmentsTableConfig";
import {
  GroupTable,
  CardTableRow,
  CardTableRowGroup,
} from "../../components/V2/Table";
import HeaderSection from "../../components/V2/HeaderSection";
import Button, { ButtonVariant } from "../../components/V2/Button";
import Select from "../../components/V2/Select";
import { Restore, NewReleases } from "@material-ui/icons";
import { AppointmentSlot, DonationDay, Appointment } from "../../utils/types";

export interface AppointmentHour {
  hour: string;
  date: string;
  slots: number;
  booked: number;
  appointments: FunctionsApi.AppointmentApiEntry[];
}

interface ManageAppointmentsScreenProps {
  donationDays: DonationDay[];
  onDeleteAppointment: (appointmentId: string) => Promise<void>;
  onRemoveDonor: (appointmentId: string) => Promise<void>;
  isLoading: boolean;
  showOnlyRecentChanges: boolean;
  setShowOnlyRecentChanges: (shouldShow: boolean) => void;
  hospitalFilter: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT | "";
  setHospitalFilter: (
    newHospital: Hospital | typeof HospitalUtils.ALL_HOSPITALS_SELECT | ""
  ) => void;
  showPastAppointments: boolean;
  setShowPastAppointments: (shouldShow: boolean) => void;
  activeHospitalsForCoordinator: Hospital[];
}

export interface DeleteAppointmentPopupData {
  isOpen: boolean;
  appointment?: Appointment;
  title: string;
  content: string;
  onApproved: () => Promise<void>;
}

const emptyPopupData: DeleteAppointmentPopupData = {
  isOpen: false,
  title: "",
  content: "",
  onApproved: () => Promise.resolve(),
};

export default function ManageAppointmentsScreen({
  donationDays,
  onDeleteAppointment,
  onRemoveDonor,
  isLoading,
  showOnlyRecentChanges,
  setShowOnlyRecentChanges,
  hospitalFilter,
  setHospitalFilter,
  showPastAppointments,
  setShowPastAppointments,
  activeHospitalsForCoordinator,
}: ManageAppointmentsScreenProps) {
  const [popupData, setPopupData] =
    useState<DeleteAppointmentPopupData>(emptyPopupData);

  const [showFlash, setShowFlash] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const popMessage = (message: string) => {
    setFlashMessage(message);
    setShowFlash(true);
  };

  const groups = donationDays.map<CardTableRowGroup<AppointmentSlot>>(
    (day) => ({
      groupLabel:
        day.appointmentSlots.length > 0
          ? DateUtils.ToDateString(
              day.appointmentSlots[0].donationStartTimeMillis
            )
          : "",
      rowsInGroup: day.appointmentSlots.map<CardTableRow<AppointmentSlot>>(
        (slot) => ({
          rowData: slot,
          expandRow: (slot) =>
            AppointmentTableExpandedRowContent(
              slot,
              setPopupData,
              onRemoveDonor,
              onDeleteAppointment,
              showOnlyRecentChanges,
              popMessage
            ),
        })
      ),
    })
  );

  return (
    <>
      <HeaderSection className={Styles.hospital_picker_container}>
        <Select
          id={"hospital"}
          label={"בית חולים"}
          options={HospitalUtils.getAllHospitalOptions(
            activeHospitalsForCoordinator,
            "הכל",
            "בחר"
          )}
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
          title="14 ימים אחרונים"
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
      </HeaderSection>
      <GroupTable
        className={Styles["centered-screen"]}
        hasColumnHeaders
        columns={MainAppointmentTableColumns(showOnlyRecentChanges)}
        groups={groups}
        tableIndex={0}
      />
      <Popup
        buttonApproveText="אישור"
        open={popupData.isOpen}
        titleFirst={popupData.title}
        titleSecond={popupData.content}
        onApproved={popupData.onApproved}
        onClose={() => setPopupData(emptyPopupData)}
      />
      <PopupFlashMessage
        message={flashMessage}
        showFlash={showFlash}
        hide={() => setShowFlash(false)}
      />

      {isLoading && (
        <div className={Styles.spinner}>
          <Spinner size="40px" />
        </div>
      )}
    </>
  );
}
