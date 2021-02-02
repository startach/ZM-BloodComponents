import React from "react";
import { Hospital } from "@zm-blood-components/common";
import { INavigation } from "../interfaces/INavigation";
import { MainNavigationKeys } from "../navigator/app/MainNavigationKeys";
import UpcomingDonationScreen from "./UpcomingDonationScreen";

export default function (
  props: INavigation<MainNavigationKeys.UpcomingDonation>
) {
  return (
    <UpcomingDonationScreen
      nextDonation={new Date()}
      hospital={Hospital.TEL_HASHOMER}
      onCancel={() => {
        console.log("Asked to cancel appointment");
        props.navigation.goBack();
      }}
    />
  );
}
