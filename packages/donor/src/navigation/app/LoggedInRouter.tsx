import React, { useState } from "react";
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
import QuestionnaireScreenContainer from "../../screens/questionnaire/QuestionnaireScreenContainer";
import { DonationSlot } from "../../utils/AppointmentsGrouper";

interface LoggedInRouterProps {
  user?: Donor;
  bookedAppointment?: BookedAppointment;
  setUser: (user: Donor) => void;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export default function LoggedInRouter(props: LoggedInRouterProps) {
  const { user, bookedAppointment, setUser, setBookedAppointment } = props;
  const [donationSlotToBook, setDonationSlotToBook] = useState<
    DonationSlot | undefined
  >();

  if (!user) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/" + MainNavigationKeys.MyProfile}>
          <MyProfileScreenContainer
            user={user}
            updateUserInAppState={setUser}
          />
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
          render={() => {
            if (bookedAppointment) {
              return (
                <Redirect to={"/" + MainNavigationKeys.UpcomingDonation} />
              );
            }
            if (!donationSlotToBook) {
              return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
            }

            return (
              <QuestionnaireScreenContainer
                setBookedAppointment={props.setBookedAppointment}
                donationSlot={donationSlotToBook}
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

            return (
              <BookDonationScreenContainer
                user={user}
                setDonationSlotToBook={setDonationSlotToBook}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}
