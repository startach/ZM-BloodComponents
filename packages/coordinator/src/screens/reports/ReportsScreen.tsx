import {
  BookedAppointment,
  DateUtils,
  HospitalUtils,
  LocaleUtils,
  Hospital,
} from "@zm-blood-components/common";
import styles from "./ReportsScreen.module.scss";
import CsvDownloaderButton from "../../components/CsvDownloaderButton";
import {
  csvColumns,
  formatDataByColumns,
  getDonorReportFileName,
} from "./ReportsCsvConfig";
import { useState } from "react";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DatePicker from "../../components/DatePicker";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

export interface ReportsScreenProps {
  appointmentsWithDonorDetails: BookedAppointment[];
  isLoading: boolean;
  activeHospitalsForCoordinator: Hospital[];
  onSearch: (
    fromDate: Date,
    toDate: Date,
    hospital: HospitalUtils.HospitalOptionKey
  ) => void;
  initialStartDate: Date;
  initialEndDate: Date;
}

export default function ReportsScreen({
  appointmentsWithDonorDetails,
  isLoading,
  activeHospitalsForCoordinator,
  onSearch,
  initialStartDate,
  initialEndDate,
}: ReportsScreenProps) {
  const [fromDate, setFromDate] = useState(initialStartDate);
  const [toDate, setToDate] = useState(initialEndDate);

  const initialHospital =
    activeHospitalsForCoordinator.length === 1
      ? activeHospitalsForCoordinator[0]
      : "";
  const [hospital, setHospital] =
    useState<HospitalUtils.HospitalOptionKey>(initialHospital);

  return (
    <CoordinatorScreen
      headerProps={{
        variant: HeaderVariant.INFO,
        title: "דוחות",
        hasBurgerMenu: true,
      }}
    >
      <div className={styles.reportFields}>
        <div className={styles.fields}>
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
        </div>
        <div className={styles.buttons}>
          <Button
            title="חיפוש"
            onClick={() => onSearch(fromDate, toDate, hospital)}
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
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">תאריך</TableCell>
            <TableCell align="center">שעה</TableCell>
            <TableCell align="center">שם פרטי</TableCell>
            <TableCell align="center">שם משפחה</TableCell>
            <TableCell align="center">טלפון</TableCell>
            <TableCell align="center">סוג דם</TableCell>
            <TableCell align="center">סטאטוס</TableCell>
          </TableRow>
        </TableHead>
        {!isLoading && (
          <TableBody>
            {appointmentsWithDonorDetails.map((appointmentDetails) => (
              <TableRow
                key={appointmentDetails.id}
                data-appointment-id={appointmentDetails.id}
              >
                <TableCell>
                  {DateUtils.ToDateString(
                    appointmentDetails.donationStartTimeMillis
                  )}
                </TableCell>
                <TableCell>
                  {DateUtils.ToTimeString(
                    appointmentDetails.donationStartTimeMillis
                  )}
                </TableCell>
                <TableCell>{appointmentDetails.firstName}</TableCell>
                <TableCell>{appointmentDetails.lastName}</TableCell>
                <TableCell>
                  <a href={"tel:" + appointmentDetails.phone}>
                    {appointmentDetails.phone}
                  </a>
                </TableCell>
                <TableCell>
                  {LocaleUtils.getBloodTypeTranslation(
                    appointmentDetails.bloodType
                  )}
                </TableCell>
                <TableCell>
                  {LocaleUtils.getStatusTranslation(
                    appointmentDetails.status,
                    appointmentDetails.donationStartTimeMillis
                  )}
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
