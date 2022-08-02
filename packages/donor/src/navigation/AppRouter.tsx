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
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { MainNavigationKeys } from "./app/MainNavigationKeys";
import ResetPasswordScreenContainer from "../screens/authentication/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/authentication/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/authentication/signin/SignInScreenContainer";
import OnboardingWizardScreenContainer from "../screens/onboarding/OnboardingWizardScreenContainer";
import BookDonationScreenContainer from "../screens/bookDonation/BookDonationScreenContainer";
import AboutScreen from "../screens/about/AboutScreen";
import ContactScreen from "../screens/contact/ContactScreen";
import UpcomingDonationScreenContainer from "../screens/UpcommingDonation/UpcomingDonationScreenContainer";
import ExtendedSignupScreenContainer from "../screens/extendedSignup/ExtendedSignupScreenContainer";
import QuestionnaireScreenContainer from "../screens/questionnaire/QuestionnaireScreenContainer";
import MyProfileScreenContainer from "../screens/myProfile/MyProfileScreenContainer";
import DonationProcessScreenContainer from "../screens/about/DonationProcessScreenContainer";
import DonationApproveScreenContainer from "../screens/donationAproove/DonationApproveScreenContainer";
import UnsubscribedScreen from "../screens/unsubscribe/UnsubscribedScreen";
import { reportScreen } from "../Analytics";
import QuestionsAndAnswersScreen from "../screens/qa/QuestionsAndAnswersScreen";

const MINIMUM_SPLASH_SCREEN_TIME_MILLIS = 2_000;

export type AppStateType = {
  donor?: Donor;
  bookedAppointment?: BookedAppointment;
  pendingCompletionAppointments: BookedAppointment[];
  isFetching: boolean;
};

export default function AppRouter() {
  return (
    <Router>
      <DonorRouter />
    </Router>
  );
}

function DonorRouter() {
  const [splashMinimumTimeoutFinished, setSplashMinimumTimeoutFinished] =
    useState(false);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const availableAppointmentsStore = useAvailableAppointmentsStore();

  const [appState, setAppState] = useState<AppStateType>({
    isFetching: false,
    pendingCompletionAppointments: [],
  });

  const location = useLocation();

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
        pendingCompletionAppointments: [],
      });
      return;
    }

    async function fetchData() {
      setAppState({
        isFetching: true,
        donor: undefined,
        bookedAppointment: undefined,
        pendingCompletionAppointments: [],
      });

      const donorDetails = await FirebaseFunctions.getDonorDetails();

      setAppState({
        isFetching: false,
        donor: donorDetails.donor,
        bookedAppointment: donorDetails.bookedAppointment,
        pendingCompletionAppointments:
          donorDetails.pendingCompletionAppointments,
      });
    }

    fetchData();
  }, [loginStatus]);

  useEffect(() => {
    reportScreen(location.pathname);
  }, [location]);

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

  const popPendingCompletionAppointments = () => {
    setAppState({
      ...appState,
      pendingCompletionAppointments:
        appState.pendingCompletionAppointments.slice(1),
    });
  };

  const setIsFetching = (isFetching: boolean) => {
    setAppState({
      ...appState,
      isFetching: isFetching,
    });
  };

  const loggedIn = loginStatus === LoginStatus.LOGGED_IN;
  const pendingCompletionAppointmentsCount =
    appState.pendingCompletionAppointments.length;

  if (loggedIn && !appState.donor) {
    return <ExtendedSignupScreenContainer updateUserInAppState={setUser} />;
  }

  return (
    <Routes>
      <Route
        path={MainNavigationKeys.Login}
        element={<SignInScreenContainer loggedIn={loggedIn} />}
      />
      <Route
        path={MainNavigationKeys.Register}
        element={<RegisterScreenContainer loggedIn={loggedIn} />}
      />
      <Route
        path={MainNavigationKeys.ResetPassword}
        element={<ResetPasswordScreenContainer loggedIn={loggedIn} />}
      />
      <Route
        path={MainNavigationKeys.OnboardingWizard}
        element={<OnboardingWizardScreenContainer />}
      />
      <Route path={MainNavigationKeys.About} element={<AboutScreen />} />
      <Route
        path={MainNavigationKeys.Approve}
        element={
          <DonationApproveScreenContainer
            loggedIn={loggedIn}
            appState={appState}
            setIsFetching={setIsFetching}
            popPendingCompletionAppointment={popPendingCompletionAppointments}
          />
        }
      />
      <Route
        path={MainNavigationKeys.Process}
        element={<DonationProcessScreenContainer />}
      />
      <Route path={MainNavigationKeys.Contact} element={<ContactScreen />} />
      <Route
        path={MainNavigationKeys.MyProfile}
        element={
          <MyProfileScreenContainer
            loggedIn={loggedIn}
            user={appState.donor!}
            updateUserInAppState={setUser}
          />
        }
      />
      <Route
        path={MainNavigationKeys.UpcomingDonation}
        element={
          <UpcomingDonationScreenContainer
            loggedIn={loggedIn}
            user={appState.donor!}
            bookedAppointment={appState.bookedAppointment}
            setBookedAppointment={setBookedAppointment}
            pendingCompletionAppointmentsCount={
              pendingCompletionAppointmentsCount
            }
          />
        }
      />
      <Route
        path={MainNavigationKeys.Questionnaire}
        element={
          <QuestionnaireScreenContainer
            loggedIn={loggedIn}
            bookedAppointment={appState.bookedAppointment}
            setBookedAppointment={setBookedAppointment}
            pendingCompletionAppointmentsCount={
              pendingCompletionAppointmentsCount
            }
          />
        }
      />
      <Route
        path={MainNavigationKeys.BookDonation}
        element={
          <BookDonationScreenContainer
            appState={appState}
            isLoggedIn={loggedIn}
          />
        }
      />
      <Route
        path={MainNavigationKeys.Unsubscribe}
        element={<UnsubscribedScreen />}
      />
      <Route
        path={"*"}
        element={
          loggedIn ? (
            <Navigate to={MainNavigationKeys.BookDonation} />
          ) : (
            <Navigate to={MainNavigationKeys.OnboardingWizard} />
          )
        }
      />
      <Route
        path={MainNavigationKeys.QuestionsAndAnswers}
        element={<QuestionsAndAnswersScreen />}
      />
    </Routes>
  );
}
