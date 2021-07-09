import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ResetPasswordScreenContainer from "../screens/authentication/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/authentication/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/authentication/signin/SignInScreenContainer";
import OnboardingWizardScreenContainer from "../screens/onboarding/OnboardingWizardScreenContainer";
import { MainNavigationKeys } from "./app/MainNavigationKeys";

export default function AuthenticationRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/" + MainNavigationKeys.ResetPassword}>
          <ResetPasswordScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.Register}>
          <RegisterScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.Login}>
          <SignInScreenContainer />
        </Route>
        <Route path={"/" + MainNavigationKeys.OnboardingWizard}>
          <OnboardingWizardScreenContainer />
        </Route>
        <Route path={"*"}>
          <Redirect to={"/" + MainNavigationKeys.OnboardingWizard} />
        </Route>
      </Switch>
    </Router>
  );
}
