import { useState } from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
  Hospital,
} from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ScheduledAppointmentsScreen from "./ScheduledAppointmentsScreen";
import dayjs from "dayjs";

interface ScheduledAppointmentsScreenContainerProps {
  activeHospitalsForCoordinator: Hospital[];
}

export default function ScheduledAppointmentsScreenContainer({
  activeHospitalsForCoordinator,
}: ScheduledAppointmentsScreenContainerProps) {

  const [fromDate, setFromDate] = useState<Date>(dayjs().subtract(1, 'month').toDate());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [hospital, setHospital] = useState<Hospital | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] =
    useState<BookedDonationWithDonorDetails[]>([]);

  const onSearch = async () => {
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
    <ScheduledAppointmentsScreen
      appointmentsWithDonorDetails={appointmentsWithDonorDetails}
      isLoading={isLoading}
      activeHospitalsForCoordinator={activeHospitalsForCoordinator}
      fromDate={fromDate}
      setFromDate={setFromDate}
      toDate={toDate}
      setToDate={setToDate}
      hospital={hospital}
      setHospital={setHospital}
      onSearch={onSearch}
    />
  );
}
