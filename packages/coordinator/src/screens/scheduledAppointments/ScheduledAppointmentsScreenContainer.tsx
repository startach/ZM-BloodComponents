import { useState } from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ScheduledAppointmentsScreen from "./ScheduledAppointmentsScreen";
import HeaderSection from "../../components/HeaderSection";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import Button from "../../components/Button";
import styles from "./ScheduledAppointmentsScreen.module.scss";
import CsvDownloaderButton from "../../components/CsvDownloaderButton";
import {
  csvColumns,
  formatDataByColumns,
} from "./ScheduledAppointmentsCsvConfig";

interface ScheduledAppointmentsScreenContainerProps {
  activeHospitalsForCoordinator: Hospital[];
}

export default function ScheduledAppointmentsScreenContainer({
  activeHospitalsForCoordinator,
}: ScheduledAppointmentsScreenContainerProps) {
  const TWO_WEEKS_IN_MILLIS = 1000 * 60 * 60 * 24 * 14;
  const initialToDate = new Date(Date.now() + TWO_WEEKS_IN_MILLIS);

  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(initialToDate);
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
    <>
      <HeaderSection className={styles.component}>
        <Select
          id={"hospital"}
          label={"בית חולים"}
          options={HospitalUtils.getHospitalOptions(
            activeHospitalsForCoordinator,
            "בחר"
          )}
          onChange={setHospital}
          value={hospital}
          className={styles.field}
        />
        <DatePicker
          value={fromDate}
          onChange={(newDate) => setFromDate(newDate!)}
          label={"החל מתאריך"}
          className={styles.field}
          maximumDate={toDate!}
        />
        <DatePicker
          value={toDate!}
          onChange={(newDate) => setToDate(newDate!)}
          label={"עד תאריך"}
          className={styles.field}
          minimumDate={fromDate!}
        />
        <Button
          title="חיפוש"
          onClick={onSearch}
          className={styles.field}
          isDisabled={!hospital}
        />
        <CsvDownloaderButton
          title="ייצוא קובץ לאקסל"
          className={styles.field}
          isDisabled={appointmentsWithDonorDetails.length === 0}
          data={formatDataByColumns(appointmentsWithDonorDetails)}
          columns={csvColumns}
          fileName="test"
        />
      </HeaderSection>
      <ScheduledAppointmentsScreen
        appointmentsWithDonorDetails={appointmentsWithDonorDetails}
        isLoading={isLoading}
      />
    </>
  );
}
