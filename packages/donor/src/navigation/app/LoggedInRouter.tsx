import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainNavigationKeys } from "./MainNavigationKeys";
import ExtendedSignupScreenContainer from "../../screens/extendedSignup/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../../screens/UpcommingDonation/UpcomingDonationScreenContainer";
import MyProfileScreenContainer from "../../screens/myProfile/MyProfileScreenContainer";
import BookDonationScreenContainer from "../../screens/bookDonation/BookDonationScreenContainer";
import { BookedAppointment, Donor } from "@zm-blood-components/common";
import QuestionnaireScreenContainer from "../../screens/questionnaire/QuestionnaireScreenContainer";

interface LoggedInRouterProps {
  user?: Donor;
  bookedAppointment?: BookedAppointment;
  setUser: (user: Donor) => void;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export default function LoggedInRouter(props: LoggedInRouterProps) {
  const { user, bookedAppointment, setUser, setBookedAppointment } = props;

  if (!user) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/" + MainNavigationKeys.MyProfile}>
          <MyProfileScreenContainer user={user} />
        </Route>

        <Route path={"/" + MainNavigationKeys.UpcomingDonation}>
          <UpcomingDonationScreenContainer
            user={user}
            bookedAppointment={bookedAppointment}
            setBookedAppointment={setBookedAppointment}
          />
        </Route>

        <Route path={"/" + MainNavigationKeys.Questionnaire}>
          <QuestionnaireScreenContainer
            setBookedAppointment={props.setBookedAppointment}
          />
        </Route>

        <Route path={["/" + MainNavigationKeys.BookDonation, "*"]}>
          <BookDonationScreenContainer
            user={user}
            bookedAppointment={bookedAppointment}
          />
        </Route>
      </Switch>
    </Router>
  );
}
