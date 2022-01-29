import { useState } from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ReportsScreen from "./ReportsScreen";

interface ScheduledAppointmentsScreenContainerProps {
  activeHospitalsForCoordinator: Hospital[];
}

export default function ReportsScreenContainer({
  activeHospitalsForCoordinator,
}: ScheduledAppointmentsScreenContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] =
    useState<BookedDonationWithDonorDetails[]>([]);

  const onSearch = async (
    fromDate: Date,
    toDate: Date,
    hospital: HospitalUtils.HospitalOptionKey
  ) => {
    if (!hospital || !fromDate || !toDate) {
      return;
    }
    setIsLoading(true);
    // get all bookings in fromDate day
    const fromDateMidnight = DateUtils.DateToMidnight(fromDate);
    const nextAppointmentsWithDonorDetails =
      await CoordinatorFunctions.getBookedAppointmentsInHospital({
        hospital,
        fromDateMillis: fromDateMidnight!.getTime(),
        toDateMillis: toDate!.getTime(),
      });
    setAppointmentsWithDonorDetails(nextAppointmentsWithDonorDetails);
    setIsLoading(false);
  };

  return (
    <ReportsScreen
      appointmentsWithDonorDetails={appointmentsWithDonorDetails}
      isLoading={isLoading}
      activeHospitalsForCoordinator={activeHospitalsForCoordinator}
      onSearch={onSearch}
    />
  );
}
