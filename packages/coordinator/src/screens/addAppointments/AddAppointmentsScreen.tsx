import styles from "./AddAppointmentsScreen.module.scss";
import AddAppointmentsForm from "./AddAppointmentsForm";
import { NewSlots } from "./AddAppointmentsScreenContainer";
import { Hospital } from "@zm-blood-components/common";
import Button from "../../components/Button";
import { columns, rows } from "./AddAppointmentTableConfig";
import Table from "../../components/Table";
import { NotificationPopup } from "../../components/Popup";
import { useState } from "react";

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

  const handleSave = async () => {
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
      <main className={styles.content}>
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
        titleFirst="התור נוסף בהצלחה!"
      />
    </div>
  );
}
