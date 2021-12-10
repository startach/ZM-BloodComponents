import { Donor, LocaleUtils, SortingUtils } from "@zm-blood-components/common";
import Styles from "./SearchDonorsScreen.module.scss";

import Spinner from "../../components/V2/Spinner";
import Table, {
  CardTableColumn,
  CardTableRow,
} from "../../components/V2/Table";

interface SearchDonorsScreenProps {
  donors: Donor[];
  isLoading: boolean;
}

export const searchDonorColumns: CardTableColumn<Donor>[] = [
  {
    label: "שם פרטי",
    sortBy: SortingUtils.StringComparator<Donor>((d) => d.firstName),
    cellRenderer: ({ firstName }) => firstName,
  },
  {
    label: "שם משפחה",
    sortBy: SortingUtils.StringComparator<Donor>((d) => d.lastName),
    cellRenderer: ({ lastName }) => lastName,
  },
  {
    label: "טלפון",
    cellRenderer: ({ phone }) => <a href={"tel:" + phone}>{phone}</a>,
  },
  {
    label: `דוא"ל`,
    cellRenderer: ({ email }) => email,
  },
  {
    label: "סוג דם",
    sortBy: SortingUtils.StringComparator<Donor>((d) =>
      LocaleUtils.getBloodTypeTranslation(d.bloodType)
    ),
    cellRenderer: ({ bloodType }) =>
      LocaleUtils.getBloodTypeTranslation(bloodType),
  },
];

export default function SearchDonorsScreen({
  donors,
  isLoading,
}: SearchDonorsScreenProps) {
  const rows = donors.map<CardTableRow<Donor>>((donor) => ({
    rowData: donor,
  }));

  return (
    <>
      <Table
        className={Styles["centered-screen"]}
        hasColumnHeaders
        columns={searchDonorColumns}
        rows={rows}
      />
      {isLoading && <Spinner size="4rem" />}
    </>
  );
}
