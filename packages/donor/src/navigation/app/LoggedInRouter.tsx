import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainNavigationKeys } from "./MainNavigationKeys";
import ExtendedSignupScreenContainer from "../../screens/extendedSignup/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../../screens/UpcomingDonationScreenContainer";
import DonationHistoryScreenContainer from "../../screens/DonationHistoryScreenContainer";
import MyProfileScreenContainer from "../../screens/MyProfileScreenContainer";
import BookDonationScreenContainer from "../../screens/bookDonation/BookDonationScreenContainer";
import HomeScreenContainer from "../../screens/HomeScreenContainer";
import { Donor } from "@zm-blood-components/common";

interface LoggedInRouterProps {
  user?: Donor;
}

export default function LoggedInRouter({ user }: LoggedInRouterProps) {
  if (!user) {
    return <ExtendedSignupScreenContainer />;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/" + MainNavigationKeys.ExtendedSignup}>
          <ExtendedSignupScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.UpcomingDonation}>
          <UpcomingDonationScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.DonationHistory}>
          <DonationHistoryScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.MyProfile}>
          <MyProfileScreenContainer user={user} />
        </Route>
        <Route path={"/" + MainNavigationKeys.BookDonation}>
          <BookDonationScreenContainer user={user} />
        </Route>
        <Route path={"*"}>
          <HomeScreenContainer />
        </Route>
      </Switch>
    </Router>
  );
}
