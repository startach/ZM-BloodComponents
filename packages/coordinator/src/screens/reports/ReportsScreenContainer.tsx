import {useState} from "react";
import {BookedAppointment, DateUtils, HospitalUtils,} from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ReportsScreen from "./ReportsScreen";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {getAvailableHospitals} from "../../store/coordinator/CoordinatorSelectors";

export default function ReportsScreenContainer() {
  const availableHospitals = useSelector(getAvailableHospitals);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] =
    useState<BookedAppointment[]>([]);

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
      await CoordinatorFunctions.getReportsForHospital({
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
      activeHospitalsForCoordinator={availableHospitals}
      onSearch={onSearch}
      initialStartDate={dayjs().subtract(1, "month").toDate()}
      initialEndDate={new Date()}
    />
  );
}
