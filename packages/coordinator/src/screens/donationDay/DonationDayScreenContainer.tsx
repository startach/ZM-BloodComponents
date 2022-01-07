import { useEffect } from "react";
import { DateUtils } from "@zm-blood-components/common";
import { DonationDay } from "../../utils/types";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DonationDayScreen from "./DonationDayScreen";

export interface DonationDayScreenContainerProps {
  loggedIn: boolean;
}

export default function DonationDayScreenContainer(
  props: DonationDayScreenContainerProps
) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.loggedIn) {
      return;
    }
  }, [props.loggedIn]);

  const { timestamp } = useParams<{ timestamp: string }>();
  if (!timestamp || isNaN(parseInt(timestamp))) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }
  const requestedTimestamp = new Date(parseInt(timestamp));
  const dayStartTime = DateUtils.GetStartOfDay(requestedTimestamp);

  return (
    <DonationDayScreen
      dayStartTime={dayStartTime}
      donationDay={{} as DonationDay} // TODO
      onAdd={() => navigate(CoordinatorScreenKey.ADD)}
      onClickOnAppointment={() => {}} // TODO
      onDeleteAppointment={() => {}} // TODO
    />
  );
}
