import { useEffect, useState } from "react";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import { DonationDay } from "../../utils/types";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DonationDayScreen from "./DonationDayScreen";
import { fetchDonationDay } from "./DonationDayFetcher";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import { getTimestamp } from "../../navigation/RouterUtils";

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

  useEffect(() => {
    if (!props.loggedIn || !timestamp || !hospital) {
      return;
    }
    const dayStartTime = getDayStartTime(timestamp);
    if (!dayStartTime) {
      return;
    }

    fetchDonationDay(hospital, dayStartTime).then(setDonationDay);
  }, [props.loggedIn, timestamp, setDonationDay, hospital]);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  const dayStartTime = getDayStartTime(timestamp);
  if (!dayStartTime || !hospital) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  return (
    <DonationDayScreen
      dayStartTime={dayStartTime}
      donationDay={donationDay}
      hospital={hospital}
      onAdd={() => navigate(CoordinatorScreenKey.ADD)}
      onDeleteAppointment={(appointmentId) =>
        CoordinatorFunctions.deleteAppointment(appointmentId)
      }
    />
  );
}

function getDayStartTime(timestamp: string | undefined) {
  const time = getTimestamp(timestamp);
  if (!time) {
    return undefined;
  }

  return DateUtils.GetStartOfDay(time);
}
