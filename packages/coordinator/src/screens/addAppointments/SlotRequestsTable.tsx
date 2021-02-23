import React from "react";
import { NewSlots } from "./AddAppointmentsScreenContainer";
import { LocaleUtils } from "@zm-blood-components/common";
import Button from "../../components/Button";

interface SlotRequestsTableProps {
  slotsArray: NewSlots[];
  deleteSlotsRequest: (key: string) => void;
}

export default function SlotRequestsTable({
  slotsArray,
  deleteSlotsRequest,
}: SlotRequestsTableProps) {
  const renderRow = (row: NewSlots) => (
    <div key={row.key}>
      <span>{LocaleUtils.getHospitalName(row.hospital)}</span> -
      <span>{row.donationStartTime.toDateString()}</span> -
      <span>{row.slots}</span>
      <Button title="מחק" onClick={() => deleteSlotsRequest(row.key)} />
    </div>
  );

  return <div>{slotsArray.map(renderRow)}</div>;
}
