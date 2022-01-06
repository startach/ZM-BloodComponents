import { Navigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordScreenContainer(props: {
  loggedIn: boolean;
}) {
  if (props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULED_APPOINTMENTS} />;
  }

  const onResetPassword = async (
    email: string,
    emailError: (error: string) => void
  ) => {
    try {
      await sendPasswordResetEmail(getAuth(), email);
    } catch (e) {
      emailError("לא ניתן להשלים את הפעולה");
    }
  };

  return <ResetPasswordScreen onResetPassword={onResetPassword} />;
}
