import React, { useEffect, useState } from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import UpcomingDonationScreen, {
  UpcomingDonationStates,
} from "./UpcomingDonationScreen";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export default function UpcomingDonationScreenContainer() {
  const history = useHistory();
  const [upcomingDonations, setUpcomingDonations] = useState<
    BookedAppointment | undefined
  >();

  useEffect(() => {
    FirebaseFunctions.getFutureAppointments().then((futureAppointments) => {
      setUpcomingDonations(futureAppointments[0]);
    });
  }, []);

  //TODO: ensure that a donation is always available
  if (!upcomingDonations) return <></>;

  return (
    <UpcomingDonationScreen
      state={UpcomingDonationStates.sameDayDonation}
      lastDonation={new Date(2021, 0, 13)}
      upcomingDonation={upcomingDonations}
      firstName={"יוני"}
      onConfirm={() => {
        console.log("donation confirmed");
      }}
      onCancel={() => {
        console.log("Asked to cancel appointment");
        history.goBack();
      }}
    />
  );
}
