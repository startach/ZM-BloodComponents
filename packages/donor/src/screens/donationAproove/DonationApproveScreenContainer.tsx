import DonationApproveScreen from "./DonationApproveScreen";
import { Hospital } from "@zm-blood-components/common";

export interface DonationApproveScreenContainerProps {
  firstName?: string;
  hospital: Hospital;
  donationStartTimeMillis: number;
  onShowOptionSelected: (isNoShow: boolean) => void;
}

export default function DonationApproveScreenContainer({
  firstName,
  hospital,
  donationStartTimeMillis,
  onShowOptionSelected,
}: DonationApproveScreenContainerProps) {
  return (
    <DonationApproveScreen
      firstName={firstName}
      hospital={hospital}
      donationStartTimeMillis={donationStartTimeMillis}
      onShowOptionSelected={onShowOptionSelected}
    />
  );
}
