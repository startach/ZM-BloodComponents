import DonationApproveScreen from "./DonationApproveScreen";
import { BookedAppointment } from "common/src/types";

interface DonationApproveScreenContainerProps {
    firstName?: string;
    apointmentNotAprooved?: BookedAppointment;
    onShowOptionSelected: (isNoShow : boolean) => void;
}

export default function DonationApproveScreenContainer({
  firstName,
  apointmentNotAprooved,
  onShowOptionSelected,
}: DonationApproveScreenContainerProps) {

    return (
        <DonationApproveScreen
            apointmentNotAprooved={apointmentNotAprooved}
            firstName={firstName}
            onShowOptionSelected={onShowOptionSelected}
        />
    );
}