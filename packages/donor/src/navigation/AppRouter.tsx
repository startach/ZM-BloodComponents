import React, { useState } from "react";
import AuthLoadingScreenContainer from "../screens/authentication/AuthLoadingScreenContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import SignInScreenContainer from "../screens/signin/SignInScreenContainer";
import RegisterScreenContainer from "../screens/register/RegisterScreenContainer";
import ResetPasswordScreenContainer from "../screens/resetpassword/ResetPasswordScreenContainer";
import { MainNavigationKeys } from "./app/MainNavigationKeys";
import HomeScreenContainer from "../screens/HomeScreenContainer";
import BookDonationScreenContainer from "../screens/bookDonation/BookDonationScreenContainer";
import ExtendedSignupScreenContainer from "../screens/extendedSignup/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../screens/UpcomingDonationScreenContainer";
import DonationHistoryScreenContainer from "../screens/DonationHistoryScreenContainer";
import MyProfileScreenContainer from "../screens/MyProfileScreenContainer";

export default function AppRouter() {
  const [loggedInStatus, setLoggedInStatus] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  if (loggedInStatus.isLoading) {
    return (
      <AuthLoadingScreenContainer
        setIsLoggedIn={(isLoggedIn: boolean) => {
          setLoggedInStatus({
            isLoggedIn,
            isLoading: false,
          });
        }}
      />
    );
  }

  if (!loggedInStatus.isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route path={"/" + AuthenticationScreenKeys.ResetPassword}>
            <ResetPasswordScreenContainer />
          </Route>
          <Route path={"/" + AuthenticationScreenKeys.Register}>
            <RegisterScreenContainer />
          </Route>
          <Route path={"*"}>
            <SignInScreenContainer />
          </Route>
        </Switch>
      </Router>
    );
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
          <MyProfileScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.BookDonation}>
          <BookDonationScreenContainer />
        </Route>
        <Route path={"*"}>
          <HomeScreenContainer />
        </Route>
      </Switch>
    </Router>
  );
}
