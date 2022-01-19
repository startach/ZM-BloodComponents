import { MANUAL_DONOR_ID } from "./types";

export function isManualDonor(donorId: string) {
  return donorId === MANUAL_DONOR_ID;
}
