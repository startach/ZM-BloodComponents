import React from "react";
import styles from "./NewSlot.module.scss";
import { DateUtils, FunctionsApi } from "@zm-blood-components/common";
import { ReactComponent as PinkTrash } from "../../assets/icons/trash-pink.svg";

export type NewSlotProps = {
  slot: FunctionsApi.NewSlotsRequest;
  onDelete: () => void;
};

export default function NewSlot({ slot, onDelete }: NewSlotProps) {
  return (
    <div className={styles.newSlotContainer}>
      <div className={styles.slotElements}>
        <div>{DateUtils.ToTimeString(slot.donationStartTimeMillis)}</div>
        <div>{slot.slots} עמדות</div>
        <PinkTrash className={styles.delete} onClick={onDelete} />
      </div>
    </div>
  );
}
