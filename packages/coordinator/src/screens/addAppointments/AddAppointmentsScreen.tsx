import styles from "./AddAppointmentsScreen.module.scss";
import AddAppointmentsForm from "./AddAppointmentsForm";
import { NewSlots } from "./AddAppointmentsScreenContainer";
import { Hospital } from "@zm-blood-components/common";
import Button from "../../components/Button";
import { columns, rows } from "./AddAppointmentTableConfig";
import Table from "../../components/Table";
import { NotificationPopup } from "../../components/Popup";
import { useState } from "react";
import _ from "lodash";

interface AddAppointmentsScreenProps {
  activeHospitalsForCoordinator: Hospital[];
  slotsArray: NewSlots[];
  setSlotsArray: (newSlots: NewSlots[]) => void;
  deleteSlotsRequest: (key: string) => void;
  isSaving: boolean;
  onSave: () => Promise<void>;
}

export default function AddAppointmentsScreen({
  activeHospitalsForCoordinator,
  slotsArray,
  setSlotsArray,
  deleteSlotsRequest,
  isSaving,
  onSave,
}: AddAppointmentsScreenProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [slotsCountToShowInPopup, setSlotsCountToShowInPopup] = useState(0);

  const handleSave = async () => {
    setSlotsCountToShowInPopup(_.sumBy(slotsArray, (slot) => slot.slots));
    await onSave();
    setShowPopup(true);
  };

  return (
    <div className={styles.component}>
      <AddAppointmentsForm
        slotsArray={slotsArray}
        setSlotsArray={setSlotsArray}
        activeHospitalsForCoordinator={activeHospitalsForCoordinator}
      />
      <main>
        <Table
          hasColumnHeaders
          columns={columns(deleteSlotsRequest)}
          rows={rows(slotsArray)}
          aria-label={"add donation slots table"}
        />
      </main>

      <footer className={styles.footer}>
        {slotsArray.length > 0 && (
          <Button
            title="שמור והמשך"
            onClick={handleSave}
            isLoading={isSaving}
          />
        )}
      </footer>
      <NotificationPopup
        open={showPopup}
        buttonApproveText={"המשך"}
        onClose={() => setShowPopup(false)}
        titleFirst={
          slotsCountToShowInPopup === 1
            ? "התור נוסף בהצלחה!"
            : slotsCountToShowInPopup + " תורים נוספו בהצלחה!"
        }
      />
    </div>
  );
}
