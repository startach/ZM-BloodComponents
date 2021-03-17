import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationScreenKeys } from "./authentication/AuthenticationScreenKeys";
import ResetPasswordScreenContainer from "../screens/resetpassword/ResetPasswordScreenContainer";
import RegisterScreenContainer from "../screens/register/RegisterScreenContainer";
import SignInScreenContainer from "../screens/signin/SignInScreenContainer";

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
