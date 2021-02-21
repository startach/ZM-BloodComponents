import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainNavigationKeys } from "./MainNavigationKeys";
import ExtendedSignupScreenContainer from "../../screens/extendedSignup/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../../screens/UpcommingDonation/UpcomingDonationScreenContainer";
import DonationHistoryScreenContainer from "../../screens/DonationHistoryScreenContainer";
import MyProfileScreenContainer from "../../screens/MyProfileScreenContainer";
import BookDonationScreenContainer from "../../screens/bookDonation/BookDonationScreenContainer";
import HomeScreenContainer from "../../screens/HomeScreenContainer";
import { Donor } from "@zm-blood-components/common";
import QuestionnaireScreenContainer from "../../screens/questionnaire/QuestionnaireScreenContainer";
import AppHeader from "./AppHeader/AppHeader"
import Styles from "./LoggedInRouter.module.scss"

interface LoggedInRouterProps {
  user?: Donor;
  setUser: (user: Donor) => void;
}

export default function LoggedInRouter({ user, setUser }: LoggedInRouterProps) {
  const {firstName, lastName, phone, bloodType} = user as Donor
  
  if (!user || !firstName || !lastName || !phone || !bloodType) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <>
      <Router>
        <AppHeader />
        <div className={Styles["after-header"]} >
          <Switch>
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
            <Route path={"/" + MainNavigationKeys.Questionnaire}>
              <QuestionnaireScreenContainer />
            </Route>
            <Route path={"*"}>
              <HomeScreenContainer user={user} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
