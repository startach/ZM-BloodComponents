import { useState } from "react";
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
import AboutScreen from "../../screens/about/AboutScreen";
import {
  BookedAppointment,
  Donor,
  Hospital,
} from "@zm-blood-components/common";
import QuestionnaireScreenContainer from "../../screens/questionnaire/QuestionnaireScreenContainer";
import ContactScreen from "../../screens/contact/ContactScreen";

interface LoggedInRouterProps {
  user?: Donor;
  bookedAppointment?: BookedAppointment;
  setUser: (user: Donor) => void;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export type DonationSlotToBook = {
  hospital: Hospital;
  donationStartTimeMillis: number;
  appointmentIds: string[];
};

export default function LoggedInRouter(props: LoggedInRouterProps) {
  const { user, bookedAppointment, setUser, setBookedAppointment } = props;
  const [donationSlotToBook, setDonationSlotToBook] =
    useState<DonationSlotToBook | undefined>();

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
        <Route path={"/" + MainNavigationKeys.About}>
          <AboutScreen />
        </Route>
        <Route path={"/" + MainNavigationKeys.Contact}>
          <ContactScreen />
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
