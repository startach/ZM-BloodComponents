import {
  DateUtils,
  HospitalUtils,
  LocaleUtils,
  SortingUtils,
} from "@zm-blood-components/common";
import { BookedDonationWithDonorDetails, Hospital } from "common/src/types";
import Table, {
  CardTableColumn,
  CardTableRow,
} from "../../components/V2/Table";
import Spinner from "../../components/V2/Spinner";
import HeaderSection from "../../components/V2/HeaderSection";
import Select from "../../components/V2/Select";
import DatePicker from "../../components/V2/DatePicker";
import Button from "../../components/V2/Button";
import styles from "./ScheduledAppointmentsScreen.module.scss";
import CsvDownloaderButton from "../../components/V2/CsvDownloaderButton";
import {
  csvColumns,
  formatDataByColumns,
  getDonorReportFileName,
} from "./ScheduledAppointmentsCsvConfig";

export interface ScheduledAppointmentsScreenProps {
  appointmentsWithDonorDetails: BookedDonationWithDonorDetails[];
  isLoading: boolean;
  activeHospitalsForCoordinator: Hospital[];
  fromDate: Date;
  setFromDate: (newDate: Date) => void;
  toDate: Date;
  setToDate: (newDate: Date) => void;
  hospital: HospitalUtils.HospitalOptionKey;
  setHospital: (newHospital: HospitalUtils.HospitalOptionKey) => void;
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
      cellRenderer: ({ phone }) => <a href={"tel:" + phone}>{phone}</a>,
    },
    {
      label: "סטטוס",
      sortBy: SortingUtils.StringComparator<BookedDonationWithDonorDetails>(
        (d) => d.status
      ),
      cellRenderer: ({ status, donationStartTimeMillis }) =>
        LocaleUtils.getStatusTranslation(status, donationStartTimeMillis),
    },
  ];

  return (
    <main>
      <HeaderSection>
        <Select
          id={"hospital"}
          label={"בית חולים"}
          options={HospitalUtils.getAllHospitalOptions(
            activeHospitalsForCoordinator
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
          fileName={getDonorReportFileName(hospital, fromDate, toDate)}
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
