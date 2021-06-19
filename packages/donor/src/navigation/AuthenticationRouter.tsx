import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import ResetPasswordScreenContainer from "../screens/authentication/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/authentication/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/authentication/signin/SignInScreenContainer";

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
        <Route path={"*"}>
          <SignInScreenContainer />
        </Route>
      </Switch>
    </Router>
  );
}
