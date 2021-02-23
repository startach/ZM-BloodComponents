import React from "react";
import AddAppointmentsForm from "./AddAppointmentsForm";
import { NewSlots } from "./AddAppointmentsScreenContainer";
import { Hospital } from "@zm-blood-components/common";
import SlotRequestsTable from "./SlotRequestsTable";
import Button from "../../components/Button";

interface AddAppointmentsScreenProps {
  slotsArray: NewSlots[];
  addSlotsRequest: (
    hospital: Hospital,
    donationStartTime: Date,
    slots: number
  ) => void;
  deleteSlotsRequest: (key: string) => void;
  isSaving: boolean;
  onSave: () => void;
}

export default function AddAppointmentsScreen({
  slotsArray,
  addSlotsRequest,
  deleteSlotsRequest,
  isSaving,
  onSave,
}: AddAppointmentsScreenProps) {
  return (
    <div>
      <AddAppointmentsForm addSlotsRequest={addSlotsRequest} />
      <SlotRequestsTable
        slotsArray={slotsArray}
        deleteSlotsRequest={deleteSlotsRequest}
      />

      {slotsArray.length > 0 && (
        <Button title="שמור והמשך" onClick={onSave} isLoading={isSaving} />
      )}
    </div>
  );
}
