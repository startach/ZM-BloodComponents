import { useState } from "react";
import { BookedDonationWithDonorDetails, DateUtils, Hospital, HospitalUtils } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import ScheduledAppointmentsScreen from "./ScheduledAppointmentsScreen";
import HeaderSection from "../../components/HeaderSection";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";

export default function ScheduledAppointmentsScreenContainer() {
    const [fromDate, setFromDate] = useState<Date | null>(new Date());
    const [toDate, setToDate] = useState<Date | null>();
    const [hospital, setHospital] = useState<Hospital | "">();
    const [isLoading, setIsLoading] = useState(false);
    const [appointmentsWithDonorDetails, setAppointmentsWithDonorDetails] = useState<BookedDonationWithDonorDetails[]>([]);

    const onSearch = async () => {
        setIsLoading(true);
        if (hospital && fromDate && toDate) {
            const nextAppointmentsWithDonorDetails = await CoordinatorFunctions.getBookedAppointmentsInHospital({ hospital, fromDateMillis: fromDate.getTime(), toDateMillis: toDate.getTime() });
            setAppointmentsWithDonorDetails(nextAppointmentsWithDonorDetails)
        }
        setIsLoading(false);
    };

    return (
        <div>
            <HeaderSection>
                <Select
                    id={"hospital"}
                    label={"בית חולים"}
                    options={HospitalUtils.getAllHospitalOptions()}
                    onChange={setHospital}
                    value={hospital}
                />
                <DatePicker
                    value={fromDate}
                    onChange={setFromDate}
                    label={"החל מתאריך"}
                    disablePast
                />
                <DatePicker
                    value={toDate!}
                    onChange={setToDate}
                    label={"עד תאריך"}
                    disablePast
                />
            </HeaderSection>
            <ScheduledAppointmentsScreen
                appointmentsWithDonorDetails={appointmentsWithDonorDetails}
                isLoading={isLoading}
            />
        </div>
    );
}