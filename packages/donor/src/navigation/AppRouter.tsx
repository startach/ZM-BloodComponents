import React, { useState } from "react";
import AuthLoadingScreenContainer from "../screens/authentication/AuthLoadingScreenContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import SignInScreenContainer from "../screens/signin/SignInScreenContainer";
import RegisterScreenContainer from "../screens/register/RegisterScreenContainer";
import ResetPasswordScreenContainer from "../screens/resetpassword/ResetPasswordScreenContainer";
import LoggedInRouter from "./app/LoggedInRouter";
import { Donor } from "@zm-blood-components/common";

type AppState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: Donor;
};

export default function AppRouter() {
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
    isLoggedIn: false,
  });

  if (appState.isLoading) {
    return (
      <AuthLoadingScreenContainer
        onFinishedLoading={(isLoggedIn: boolean, user?: Donor) => {
          setAppState({
            isLoggedIn,
            isLoading: false,
            user: user,
          });
        }}
      />
    );
  }

  if (!appState.isLoggedIn) {
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

  return <LoggedInRouter user={appState.user} />;
}
