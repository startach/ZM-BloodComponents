import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import ResetPasswordScreenContainer from "../screens/authentication/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/authentication/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/authentication/signin/SignInScreenContainer";
import OnboardingWizardScreenContainer from "../screens/onboarding/OnboardingWizardScreenContainer";

export default function AuthenticationRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/" + AuthenticationScreenKeys.ResetPassword}>
          <ResetPasswordScreenContainer />
        </Route>
        <Route path={"/" + AuthenticationScreenKeys.Register}>
          <RegisterScreenContainer />
        </Route>
        <Route path={"/" + AuthenticationScreenKeys.Login}>
          <SignInScreenContainer />
        </Route>
        <Route path={"/" + AuthenticationScreenKeys.OnboardingWizard}>
          <OnboardingWizardScreenContainer />
        </Route>
        <Route path={"*"}>
          <Redirect to={"/" + AuthenticationScreenKeys.OnboardingWizard} />
        </Route>
      </Switch>
    </Router>
  );
}
