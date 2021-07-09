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
import { useEffect, useState } from "react";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import AuthLoadingScreen from "../../screens/authentication/AuthLoadingScreen";

export type DonationSlotToBook = {
  hospital: Hospital;
  donationStartTimeMillis: number;
  appointmentIds: string[];
};

export default function LoggedInRouter() {
  const [appState, setAppState] = useState<{
    donor?: Donor;
    bookedAppointment?: BookedAppointment;
    isFetching: boolean;
  }>({
    isFetching: false,
  });

  useEffect(() => {
    async function fetchData() {
      setAppState({
        isFetching: true,
        donor: undefined,
        bookedAppointment: undefined,
      });

      const startTime = new Date().getTime();
      const donorPromise = FirebaseFunctions.getDonor();
      const bookedAppointmentPromise = FirebaseFunctions.getBookedAppointment();

      const donor = await donorPromise;
      const bookedAppointment = await bookedAppointmentPromise;

      setAppState({
        isFetching: false,
        donor: donor,
        bookedAppointment: bookedAppointment,
      });
      console.log("D", new Date().getTime() - startTime);
    }

    fetchData();
  }, []);

  if (appState.isFetching) {
    return <AuthLoadingScreen />;
  }

  const setUser = (user: Donor) => {
    setAppState({
      ...appState,
      donor: user,
    });
  };

  const setBookedAppointment = (bookedAppointment?: BookedAppointment) => {
    setAppState({
      ...appState,
      bookedAppointment,
    });
  };

  if (!appState.donor) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/" + MainNavigationKeys.MyProfile}>
          <MyProfileScreenContainer
            user={appState.donor}
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
            if (!appState.bookedAppointment) {
              return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
            }

            return (
              <UpcomingDonationScreenContainer
                user={appState.donor!}
                bookedAppointment={appState.bookedAppointment}
                setBookedAppointment={setBookedAppointment}
              />
            );
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.Questionnaire}
          render={() => {
            if (appState.bookedAppointment) {
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
            if (appState.bookedAppointment) {
              return (
                <Redirect to={"/" + MainNavigationKeys.UpcomingDonation} />
              );
            }

            return <BookDonationScreenContainer user={appState.donor} />;
          }}
        />
        <Route path={"*"}>
          <Redirect to={"/" + MainNavigationKeys.BookDonation} />
        </Route>
      </Switch>
    </Router>
  );
}
