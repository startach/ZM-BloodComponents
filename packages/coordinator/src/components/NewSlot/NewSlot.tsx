import React from "react";
import styles from "./NewSlot.module.scss";
import { DateUtils } from "@zm-blood-components/common";
import { ReactComponent as PinkTrash } from "../../assets/icons/trash-pink.svg";

export type NewSlotProps = {
  slot: {
    donationStartTimeMillis: number;
    count: number;
  };
  onDelete: () => void;
};

export default function NewSlot({ slot, onDelete }: NewSlotProps) {
  return (
    <div className={styles.newSlotContainer}>
      <div className={styles.slotElements}>
        <div>{DateUtils.ToTimeString(slot.donationStartTimeMillis)}</div>
        <div>{slot.count} עמדות</div>
        <PinkTrash className={styles.delete} onClick={onDelete} />
      </div>
    </div>
  );
}
