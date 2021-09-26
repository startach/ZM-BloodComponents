import {
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";
import Spinner from "../../components/Spinner";
import Popup from "../../components/Popup";
import PopupFlashMessage from "../../components/Popup/PopupFlashMessage";

import { useState } from "react";
import {
  AppointmentTableExpandedRowContent,
  MainAppointmentTableColumns,
} from "./ManageAppointmentsTableConfig";
import {
  AppointmentSlot,
  DonationDay,
  ManagedAppointment,
} from "./CoordinatorAppointmentsGrouper";
import {
  GroupTable,
  CardTableRow,
  CardTableRowGroup,
} from "../../components/Table";
import HeaderSection from "../../components/HeaderSection";
import Button, { ButtonVariant } from "../../components/Button";
import Select from "../../components/Select";
import { Restore, NewReleases } from "@material-ui/icons";


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
  hospitalFilter: Hospital | "";
  setHospitalFilter: (newHospital: Hospital | "") => void;
  showPastAppointments: boolean;
  setShowPastAppointments: (shouldShow: boolean) => void;
  activeHospitalsForCoordinator: Hospital[];
}

export interface DeleteAppointmentPopupData {
  isOpen: boolean;
  appointment?: ManagedAppointment;
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

  const [showFlash, setShowFlash] = useState(false)
  const [flashMessage, setFlashMessage] = useState('')
  
  const popMessage = (message: string) => {
    setFlashMessage(message);
    setShowFlash(true);
    
    setTimeout(() => {
      setShowFlash(false);
    }, 1400);
  }

  const groups = donationDays.map<CardTableRowGroup<AppointmentSlot>>(
    (day) => ({
      groupLabel: day.day,
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
          options={HospitalUtils.getHospitalOptions(
            activeHospitalsForCoordinator,
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
      />

      {isLoading && (
        <div className={Styles.spinner}>
          <Spinner size="40px" />
        </div>
      )}
    </>
  );
}
