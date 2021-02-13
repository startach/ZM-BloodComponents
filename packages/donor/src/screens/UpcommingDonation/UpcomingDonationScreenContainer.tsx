import React, { useEffect, useState } from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import UpcomingDonationScreen from "./UpcomingDonationScreen";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export default function UpcomingDonationScreenContainer() {
  const history = useHistory();
  const [upcomingDonations, setUpcomingDonations] = useState<
    BookedAppointment[]
  >([]);

  useEffect(() => {
    FirebaseFunctions.getFutureAppointments().then((futureAppointments) =>
      setUpcomingDonations(futureAppointments)
    );
  }, []);

  return (
    <UpcomingDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      upcomingDonations={upcomingDonations}
      firstName={"יוני"}
      onCancel={() => {
        console.log("Asked to cancel appointment");
        history.goBack();
      }}
    />
  );
}
