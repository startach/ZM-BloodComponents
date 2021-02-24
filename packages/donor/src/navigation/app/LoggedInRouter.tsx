import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MainNavigationKeys } from "./MainNavigationKeys";
import ExtendedSignupScreenContainer from "../../screens/extendedSignup/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../../screens/UpcommingDonation/UpcomingDonationScreenContainer";
import MyProfileScreenContainer from "../../screens/myProfile/MyProfileScreenContainer";
import BookDonationScreenContainer from "../../screens/bookDonation/BookDonationScreenContainer";
import { BookedAppointment, Donor } from "@zm-blood-components/common";
import QuestionnaireScreenContainer, {
  QuestionnaireRoutingProps,
} from "../../screens/questionnaire/QuestionnaireScreenContainer";

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

        <Route
          path={"/" + MainNavigationKeys.UpcomingDonation}
          render={() => {
            if (!bookedAppointment) {
              return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
            }

            return (
              <UpcomingDonationScreenContainer
                user={user}
                bookedAppointment={bookedAppointment}
                setBookedAppointment={setBookedAppointment}
              />
            );
          }}
        />

        <Route
          path={"/" + MainNavigationKeys.Questionnaire}
          render={(match) => {
            const state = match.location.state as QuestionnaireRoutingProps;
            if (!state.donationSlot) {
              return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
            }

            return (
              <QuestionnaireScreenContainer
                setBookedAppointment={props.setBookedAppointment}
                donationSlot={state.donationSlot}
              />
            );
          }}
        />

        <Route
          path={["/" + MainNavigationKeys.BookDonation, "*"]}
          render={() => {
            if (bookedAppointment) {
              return (
                <Redirect to={"/" + MainNavigationKeys.UpcomingDonation} />
              );
            }

            return <BookDonationScreenContainer user={user} />;
          }}
        />
      </Switch>
    </Router>
  );
}
