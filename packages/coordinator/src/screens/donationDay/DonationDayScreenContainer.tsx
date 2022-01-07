import { useEffect, useState } from "react";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import { DonationDay } from "../../utils/types";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DonationDayScreen from "./DonationDayScreen";
import { fetchDonationDay } from "./DonationDayFetcher";

export interface DonationDayScreenContainerProps {
  loggedIn: boolean;
}

export default function DonationDayScreenContainer(
  props: DonationDayScreenContainerProps
) {
  const navigate = useNavigate();
  const [donationDay, setDonationDay] = useState<DonationDay | undefined>();
  const { timestamp, hospital } =
    useParams<{ timestamp: string; hospital: Hospital }>();
  const dayStartTime = getDayStartTime(timestamp);

  useEffect(() => {
    if (!props.loggedIn || !dayStartTime || !hospital) {
      return;
    }

    fetchDonationDay(hospital, dayStartTime).then(setDonationDay);
  }, [props.loggedIn, dayStartTime, setDonationDay, hospital]);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!dayStartTime || !hospital) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  return (
    <DonationDayScreen
      dayStartTime={dayStartTime}
      donationDay={donationDay}
      onAdd={() => navigate(CoordinatorScreenKey.ADD)}
      onDeleteAppointment={() => {}} // TODO
    />
  );
}

function getDayStartTime(timestamp: string | undefined) {
  if (!timestamp || isNaN(parseInt(timestamp))) {
    return undefined;
  }

  const requestedTimestamp = new Date(parseInt(timestamp));
  return DateUtils.GetStartOfDay(requestedTimestamp);
}
