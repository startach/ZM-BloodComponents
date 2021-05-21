import {  useState } from "react";
import { BookedDonationWithDonorDetails, DateUtils, Hospital, HospitalUtils } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ScheduledAppointmentsScreen from "./ScheduledAppointmentsScreen";
import HeaderSection from "../../components/HeaderSection";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import Button from "../../components/Button"
import styles from "./ScheduledAppointmentsScreen.module.scss";

export default function ScheduledAppointmentsScreenContainer() {
    const TWO_WEEKS_IN_MILLIS = 1000 * 60 * 60 * 24 * 14
    const initialToDate = new Date(Date.now() + TWO_WEEKS_IN_MILLIS)

    const [fromDate, setFromDate] = useState<Date | null>(new Date());
    const [toDate, setToDate] = useState<Date | null>(initialToDate);
    const [hospital, setHospital] = useState<Hospital | "">("");
    const [isLoading, setIsLoading] = useState(false);
    const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] = useState<BookedDonationWithDonorDetails[]>([]);


    const onSearch = async () => {
        if (!hospital) {
            alert("נא להזין בית חולים")
            return
        }
        if (DateUtils.DateComparer(fromDate!, toDate!) >= 0) {
            alert("מועד סיום לא תקין")
            return
        }
        setIsLoading(true);
        debugger
        const nextAppointmentsWithDonorDetails = await CoordinatorFunctions.getBookedAppointmentsInHospital({ hospital, fromDateMillis: fromDate!.getTime(), toDateMillis: toDate!.getTime() });
        setAppointmentsWithDonorDetails(nextAppointmentsWithDonorDetails)
        setIsLoading(false);
    };

    const downloadCSVFile = () => {}
    return (
        <>
            <HeaderSection className={styles.component}>
                <Select
                    id={"hospital"}
                    label={"בית חולים"}
                    options={HospitalUtils.getAllHospitalOptions()}
                    onChange={setHospital}
                    value={hospital}
                    className={styles.field}
                />
                <DatePicker
                    value={fromDate}
                    onChange={setFromDate}
                    label={"החל מתאריך"}
                    disablePast
                    className={styles.field}
                />
                <DatePicker
                    value={toDate!}
                    onChange={setToDate}
                    label={"עד תאריך"}
                    disablePast
                    className={styles.field}
                />
                <Button
                    title="חיפוש"
                    onClick={onSearch}
                    className={styles.field}
                />
                 <Button
                    title="ייצוא לקובץ אקסל"
                    onClick={downloadCSVFile}
                    className={styles.field}
                    isDisabled={appointmentsWithDonorDetails.length === 0}
                />
            </HeaderSection>
            <ScheduledAppointmentsScreen
                appointmentsWithDonorDetails={appointmentsWithDonorDetails}
                isLoading={isLoading}
            />
        </>
    );
}