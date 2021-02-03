import React from "react";
import { Hospital } from "@zm-blood-components/common";
import UpcomingDonationScreen from "./UpcomingDonationScreen";
import { useHistory } from "react-router-dom";

export default function UpcomingDonationScreenContainer() {
  const history = useHistory();

  return (
    <UpcomingDonationScreen
      nextDonation={new Date()}
      hospital={Hospital.TEL_HASHOMER}
      onCancel={() => {
        console.log("Asked to cancel appointment");
        history.goBack();
      }}
    />
  );
}
