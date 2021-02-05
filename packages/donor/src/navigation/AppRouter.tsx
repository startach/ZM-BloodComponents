import React, { useState } from "react";
import AuthLoadingScreenContainer from "../screens/authentication/AuthLoadingScreenContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import SignInScreenContainer from "../screens/authentication/SignInScreenContainer";
import RegisterScreenContainer from "../screens/authentication/RegisterScreenContainer";
import ResetPasswordScreenContainer from "../screens/authentication/ResetPasswordScreenContainer";
import { MainNavigationKeys } from "./app/MainNavigationKeys";
import HomeScreenContainer from "../screens/HomeScreenContainer";
import BookDonationScreenContainer from "../screens/BookDonationScreenContainer";
import ExtendedSignupScreenContainer from "../screens/ExtendedSignupScreenContainer";
import UpcomingDonationScreenContainer from "../screens/UpcomingDonationScreenContainer";
import { UserDetails } from "../App";

interface AppRouterProps {
  setUserDetails: (userDetails: UserDetails) => void;
}

export default function AppRouter(props: AppRouterProps) {
  const [loggedInStatus, setLoggedInStatus] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  if (loggedInStatus.isLoading) {
    return (
      <AuthLoadingScreenContainer
        setUserDetails={props.setUserDetails}
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
