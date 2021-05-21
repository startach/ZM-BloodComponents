import { useState } from "react";
import { BookedDonationWithDonorDetails, Hospital, HospitalUtils } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ScheduledAppointmentsScreen from "./ScheduledAppointmentsScreen";
import HeaderSection from "../../components/HeaderSection";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import Button from "../../components/Button"
import styles from "./ScheduledAppointmentsScreen.module.scss";
import CsvDownloader from 'react-csv-downloader';


export default function ScheduledAppointmentsScreenContainer() {
    const TWO_WEEKS_IN_MILLIS = 1000 * 60 * 60 * 24 * 14
    const initialToDate = new Date(Date.now() + TWO_WEEKS_IN_MILLIS)

    const [fromDate, setFromDate] = useState<Date | null>(new Date());
    const [toDate, setToDate] = useState<Date | null>(initialToDate);
    const [hospital, setHospital] = useState<Hospital | "">("");
    const [isLoading, setIsLoading] = useState(false);
    const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] = useState<BookedDonationWithDonorDetails[]>([]);


    const onSearch = async () => {
        if (!hospital || !fromDate || !toDate) {
            return
        }
        setIsLoading(true);
        const nextAppointmentsWithDonorDetails = await CoordinatorFunctions.getBookedAppointmentsInHospital({ hospital, fromDateMillis: fromDate!.getTime(), toDateMillis: toDate!.getTime() });
        setAppointmentsWithDonorDetails(nextAppointmentsWithDonorDetails)
        setIsLoading(false);
    };
    const columns = [{
        id: 'first',
        displayName: 'First\u00A0column'
    }, {
        id: 'second',
        displayName: 'Second column'
    }];

    const datas = [{
        first: 'foo',
        second: 'bar'
    }, {
        first: 'foobar',
        second: 'foobar'
    }];
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
                    className={styles.field}
                    maximumDate={toDate!}
                />
                <DatePicker
                    value={toDate!}
                    onChange={setToDate}
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
                <Button
                    title="ייצוא לקובץ אקסל"
                    onClick={() => { }}
                    className={styles.field}
                    isDisabled={appointmentsWithDonorDetails.length === 0}
                />
                <CsvDownloader
                    columns={columns}
                    datas={datas}
                    filename="abc"
                    separator=";"
                    wrapColumnChar="'" />
            </HeaderSection>
            <ScheduledAppointmentsScreen
                appointmentsWithDonorDetails={appointmentsWithDonorDetails}
                isLoading={isLoading}
            />
        </>
    );
}