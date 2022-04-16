import { Donor, LocaleUtils } from "@zm-blood-components/common";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import styles from "./SearchDonorsScreen.module.scss";
import Spinner from "../../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export interface SearchDonorsScreenProps {
  donors: Donor[];
  isLoading: boolean;
}

export default function SearchDonorsScreen({
  donors,
  isLoading,
}: SearchDonorsScreenProps) {
  return (
    <CoordinatorScreen
      headerProps={{
        title: "חיפוש תורמים",
        variant: HeaderVariant.INFO,
        hasBurgerMenu: true,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">שם פרטי</TableCell>
            <TableCell align="center">שם משפחה</TableCell>
            <TableCell align="center">טלפון</TableCell>
            <TableCell align="center">דוא״ל</TableCell>
            <TableCell align="center">סוג דם</TableCell>
          </TableRow>
        </TableHead>
        {!isLoading && (
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id} data-donor-id={donor.id}>
                <TableCell>{donor.firstName}</TableCell>
                <TableCell>{donor.lastName}</TableCell>
                <TableCell>
                  <a href={"tel:" + donor.phone}>{donor.phone}</a>
                </TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>
                  {LocaleUtils.getBloodTypeTranslation(donor.bloodType)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {isLoading && (
        <div className={styles.spinner}>
          <Spinner size={"3rem"} />
        </div>
      )}
    </CoordinatorScreen>
  );
}
