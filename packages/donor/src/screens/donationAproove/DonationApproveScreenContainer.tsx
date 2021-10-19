import DonationApproveScreen from "./DonationApproveScreen";
import { BookedAppointment, Hospital } from "@zm-blood-components/common";
import { hostname } from "os";

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
