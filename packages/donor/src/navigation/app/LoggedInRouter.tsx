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
import DonationProcessScreen from "../../screens/about/DonationProcessScreen";

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

export default function LoggedInRouter({
  user,
  bookedAppointment,
  setUser,
  setBookedAppointment,
}: LoggedInRouterProps) {
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
        <Route path={"/" + MainNavigationKeys.Process}>
          <DonationProcessScreen />
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

            return (
              <QuestionnaireScreenContainer
                setBookedAppointment={setBookedAppointment}
              />
            );
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.BookDonation}
          render={() => {
            if (bookedAppointment) {
              return (
                <Redirect to={"/" + MainNavigationKeys.UpcomingDonation} />
              );
            }

            return <BookDonationScreenContainer user={user} />;
          }}
        />
        <Route path={"*"}>
          <Redirect to={"/" + MainNavigationKeys.BookDonation} />
        </Route>
      </Switch>
    </Router>
  );
}
