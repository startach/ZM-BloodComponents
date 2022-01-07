import { signInWithEmail } from "../../firebase/FirebaseAuthentication";
import SignInScreen from "./SignInScreen";
import { Navigate, useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

export default function SignInScreenContainer(props: { loggedIn: boolean }) {
  const navigate = useNavigate();
  if (props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULED_APPOINTMENTS} />;
  }

  return (
    <SignInScreen
      onSignInWithEmail={signInWithEmail}
      onForgotPassword={() => navigate(CoordinatorScreenKey.RESET_PASSWORD)}
    />
  );
}
