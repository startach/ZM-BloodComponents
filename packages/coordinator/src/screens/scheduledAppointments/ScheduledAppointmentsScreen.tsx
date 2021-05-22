import {
  DateUtils,
  LocaleUtils,
  SortingUtils,
} from "@zm-blood-components/common";
import { BookedDonationWithDonorDetails } from "common/src/types";
import Table, { CardTableColumn, CardTableRow } from "../../components/Table";
import Spinner from "../../components/Spinner";

export interface ScheduledAppointmentsScreenProps {
  appointmentsWithDonorDetails: BookedDonationWithDonorDetails[];
  isLoading: boolean;
}

export default function ScheduledAppointmentsScreen({
  appointmentsWithDonorDetails,
  isLoading,
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
    <>
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
    </>
  );
}
