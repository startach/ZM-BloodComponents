import { signInWithEmail } from "../../firebase/FirebaseAuthentication";
import SignInScreen from "./SignInScreen";
import { Navigate, useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../store/login/LoginStatusSelectors";

export default function SignInScreenContainer() {
  const navigate = useNavigate();
  const loggedIn = useSelector(isLoggedIn);

  if (loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  return (
    <SignInScreen
      onSignInWithEmail={signInWithEmail}
      onForgotPassword={() => navigate(CoordinatorScreenKey.RESET_PASSWORD)}
    />
  );
}
