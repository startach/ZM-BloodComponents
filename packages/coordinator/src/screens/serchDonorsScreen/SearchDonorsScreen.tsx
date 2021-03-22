import { Donor, LocaleUtils, SortingUtils } from "@zm-blood-components/common";
import Styles from "./SearchDonorsScreen.module.scss";

import Spinner from "../../components/Spinner";
import Table, { CardTableColumn, CardTableRow } from "../../components/Table";

interface SearchDonorsScreenProps {
  donors: Donor[];
  isLoading: boolean;
}

export default function SearchDonorsScreen({
  donors,
  isLoading,
}: SearchDonorsScreenProps) {
  const rows = donors.map<CardTableRow<Donor>>((donor) => ({
    rowData: donor,
  }));

  const columns: CardTableColumn<Donor>[] = [
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
      cellRenderer: ({ phone }) => phone,
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

  return (
    <div className={Styles["screen-grey-background"]}>
      <Table
        className={Styles["centered-screen"]}
        hasColumnHeaders
        columns={columns}
        rows={rows}
      />
      {isLoading && <Spinner size="4rem" />}
    </div>
  );
}
