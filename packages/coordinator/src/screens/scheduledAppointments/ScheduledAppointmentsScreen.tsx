import {
  DateUtils,
  HospitalUtils,
  LocaleUtils,
  SortingUtils,
} from "@zm-blood-components/common";
import { BookedDonationWithDonorDetails, Hospital } from "common/src/types";
import Table, { CardTableColumn, CardTableRow } from "../../components/Table";
import Spinner from "../../components/Spinner";
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

export interface ScheduledAppointmentsScreenProps {
  appointmentsWithDonorDetails: BookedDonationWithDonorDetails[];
  isLoading: boolean;
  activeHospitalsForCoordinator: Hospital[];
  fromDate: Date;
  setFromDate: (newDate: Date) => void;
  toDate: Date;
  setToDate: (newDate: Date) => void;
  hospital: Hospital | "";
  setHospital: (newHospital: Hospital | "") => void;
  onSearch: () => void;
}

export default function ScheduledAppointmentsScreen({
  appointmentsWithDonorDetails,
  isLoading,
  activeHospitalsForCoordinator,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  hospital,
  setHospital,
  onSearch,
}: ScheduledAppointmentsScreenProps) {
  const columns: CardTableColumn<BookedDonationWithDonorDetails>[] = [
    {
      label: "תאריך",
      sortBy: (a, b) => a.donationStartTimeMillis - b.donationStartTimeMillis,
      cellRenderer: ({ donationStartTimeMillis }) =>
        DateUtils.ToDateString(donationStartTimeMillis),
    },
    {
      label: "שעה",
      cellRenderer: ({ donationStartTimeMillis }) =>
        DateUtils.ToTimeString(donationStartTimeMillis),
    },
    {
      label: "בית חולים",
      cellRenderer: ({ hospital }) => hospital,
    },
    {
      label: "שם תורם",
      sortBy: SortingUtils.StringComparator<BookedDonationWithDonorDetails>(
        (d) => d.firstName
      ),
      cellRenderer: ({ firstName }) => firstName,
    },
    {
      label: "שם משפחה תורם",
      sortBy: SortingUtils.StringComparator<BookedDonationWithDonorDetails>(
        (d) => d.lastName
      ),
      cellRenderer: ({ lastName }) => lastName,
    },
    {
      label: "סוג דם",
      sortBy: SortingUtils.StringComparator<BookedDonationWithDonorDetails>(
        (d) => d.bloodType
      ),
      cellRenderer: ({ bloodType }) =>
        LocaleUtils.getBloodTypeTranslation(bloodType),
    },
    {
      label: "טלפון",
      cellRenderer: ({ phone }) => phone,
    },
  ];

  return (
    <main>
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
      <Table
        rows={appointmentsWithDonorDetails.map<
          CardTableRow<BookedDonationWithDonorDetails>
        >((appointment) => ({
          rowData: appointment,
        }))}
        columns={columns}
        hasColumnHeaders
      />
      {isLoading && <Spinner size="4rem" />}
    </main>
  );
}
