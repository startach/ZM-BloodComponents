import { useEffect, useState } from "react";
import {
  BookedAppointment,
  Donor,
  LoginStatus,
} from "@zm-blood-components/common";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import AuthLoadingScreen from "../screens/authentication/AuthLoadingScreen";
import { useAvailableAppointmentsStore } from "../state/Providers";
import { refreshAvailableAppointments } from "../state/AvailableAppointmentsStore";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MainNavigationKeys } from "./app/MainNavigationKeys";
import ResetPasswordScreenContainer from "../screens/authentication/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/authentication/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/authentication/signin/SignInScreenContainer";
import OnboardingWizardScreenContainer, {
  WIZARD_SEEN_KEY,
} from "../screens/onboarding/OnboardingWizardScreenContainer";
import BookDonationScreenContainer from "../screens/bookDonation/BookDonationScreenContainer";
import AboutScreen from "../screens/about/AboutScreen";
import ContactScreen from "../screens/contact/ContactScreen";
import UpcomingDonationScreenContainer from "../screens/UpcommingDonation/UpcomingDonationScreenContainer";
import ExtendedSignupScreenContainer from "../screens/extendedSignup/ExtendedSignupScreenContainer";
import QuestionnaireScreenContainer from "../screens/questionnaire/QuestionnaireScreenContainer";
import MyProfileScreenContainer from "../screens/myProfile/MyProfileScreenContainer";
import DonationProcessScreenContainer from "../screens/about/DonationProcessScreenContainer";
import DonationApproveScreenContainer from "../screens/donationAproove/DonationApproveScreenContainer";

const MINIMUM_SPLASH_SCREEN_TIME_MILLIS = 2_000;

export type AppStateType = {
  donor?: Donor;
  bookedAppointment?: BookedAppointment;
  apointmentNotApproved?: BookedAppointment[];
  isFetching: boolean;
};

export default function AppRouter() {
  const [splashMinimumTimeoutFinished, setSplashMinimumTimeoutFinished] =
    useState(false);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const availableAppointmentsStore = useAvailableAppointmentsStore();

  const [appState, setAppState] = useState<AppStateType>({
    isFetching: false,
  });

  useEffect(() => {
    initFirebase();
    refreshAvailableAppointments(availableAppointmentsStore);
  }, [availableAppointmentsStore]);

  useEffect(() => {
    registerAuthChange((newLoginStatus) => {
      setLoginStatus(newLoginStatus);
    });
  }, [setLoginStatus]);

  useEffect(() => {
    setTimeout(() => {
      setSplashMinimumTimeoutFinished(true);
    }, MINIMUM_SPLASH_SCREEN_TIME_MILLIS);
  }, []);

  useEffect(() => {
    if (loginStatus !== LoginStatus.LOGGED_IN) {
      // Necessary to clean data on logout
      setAppState({
        isFetching: false,
        donor: undefined,
        bookedAppointment: undefined,
        apointmentNotApproved: undefined,
      });
      return;
    }

    async function fetchData() {
      setAppState({
        isFetching: true,
        donor: undefined,
        bookedAppointment: undefined,
        apointmentNotApproved: undefined,
      });

      const today = new Date().getDate();
      const startTime = new Date().setDate(today - 60); // get appointments from last 60 days
      const donorDetails = await FirebaseFunctions.getDonorDetails(startTime);

      console.log(donorDetails);

      setAppState({
        isFetching: false,
        donor: donorDetails.donor,
        bookedAppointment: donorDetails.bookedAppointment,
        apointmentNotApproved: donorDetails.NotApprovedAppointment,
      });
    }

    fetchData();
  }, [loginStatus]);

  if (
    loginStatus === LoginStatus.UNKNOWN ||
    !splashMinimumTimeoutFinished ||
    appState.isFetching
  ) {
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

  const popNotApprovedAppointment = () => {
    if (
      appState.apointmentNotApproved &&
      appState.apointmentNotApproved.length > 1
    ) {
      setAppState({
        ...appState,
        apointmentNotApproved: appState.apointmentNotApproved.slice(1),
      });
    } else {
      setAppState({
        ...appState,
        apointmentNotApproved: undefined,
      });
    }
  };

  const setIsFetching = (isFetching: boolean) => {
    setAppState({
      ...appState,
      isFetching: isFetching,
    });
  };

  const loggedIn = loginStatus === LoginStatus.LOGGED_IN;

  if (loggedIn && !appState.donor) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <Router>
      <Switch>
        <Route
          path={"/" + MainNavigationKeys.Login}
          render={() => {
            if (loggedIn) return redirectToBookDonation();
            return <SignInScreenContainer />;
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.Register}
          render={() => {
            if (loggedIn) return redirectToBookDonation();
            return <RegisterScreenContainer />;
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.ResetPassword}
          render={() => {
            if (loggedIn) return redirectToBookDonation();
            return <ResetPasswordScreenContainer />;
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.OnboardingWizard}
          render={() => {
            if (localStorage.getItem(WIZARD_SEEN_KEY)) {
              return redirectToBookDonation();
            } else return <OnboardingWizardScreenContainer />;
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.About}
          render={() => <AboutScreen />}
        />
        <Route
          path={"/" + MainNavigationKeys.Approve}
          render={() => {
            if (!loggedIn) return redirectToBookDonation();
            if (!appState.donor || !appState.apointmentNotApproved)
              return redirectToBookDonation();

            return (
              <DonationApproveScreenContainer
                firstName={appState.donor.firstName}
                appointmentNotApproved={appState.apointmentNotApproved[0]}
                setIsFetching={setIsFetching}
                popNotApprovedAppointment={popNotApprovedAppointment}
              />
            );
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.Process}
          render={() => <DonationProcessScreenContainer />}
        />
        <Route
          path={"/" + MainNavigationKeys.Contact}
          render={() => <ContactScreen />}
        />
        <Route
          path={"/" + MainNavigationKeys.MyProfile}
          render={() => {
            if (!loggedIn) return redirectToLogin();
            if (appState.apointmentNotApproved)
              return redirectTo(MainNavigationKeys.Approve);
            return (
              <MyProfileScreenContainer
                user={appState.donor!}
                updateUserInAppState={setUser}
              />
            );
          }}
        />
        <Route
          path={"/" + MainNavigationKeys.UpcomingDonation}
          render={() => {
            if (!loggedIn) return redirectToBookDonation();
            if (appState.apointmentNotApproved)
              return redirectTo(MainNavigationKeys.Approve);
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
            if (!loggedIn) return redirectToBookDonation();
            if (appState.apointmentNotApproved)
              return redirectTo(MainNavigationKeys.Approve);
            if (appState.bookedAppointment) return redirectToUpcomingDonation();
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
            if (appState.bookedAppointment) return redirectToUpcomingDonation();
            if (appState.apointmentNotApproved)
              return redirectTo(MainNavigationKeys.Approve);
            return (
              <BookDonationScreenContainer
                user={appState.donor}
                isLoggedIn={loggedIn}
              />
            );
          }}
        />

        <Route path={"*"}>
          {loggedIn ? (
            redirectToBookDonation()
          ) : (
            <Redirect to={"/" + MainNavigationKeys.OnboardingWizard} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export function redirectToBookDonation() {
  return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
}

export function redirectToUpcomingDonation() {
  return <Redirect to={"/" + MainNavigationKeys.UpcomingDonation} />;
}

export function redirectToLogin() {
  return <Redirect to={"/" + MainNavigationKeys.Login} />;
}

export function redirectTo(page: string) {
  return <Redirect to={"/" + page} />;
}
