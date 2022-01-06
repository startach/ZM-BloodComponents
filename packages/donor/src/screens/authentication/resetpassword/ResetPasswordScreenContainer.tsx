import { validateEmail } from "../register/RegisterScreenContainer";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../../../navigation/app/MainNavigationKeys";

export default function ResetPasswordScreenContainer(props: {
  loggedIn: boolean;
}) {
  const navigate = useNavigate();
  if (props.loggedIn) {
    return <Navigate to={"/" + MainNavigationKeys.BookDonation} />;
  }

  const onResetPassword = (
    email: string,
    onSuccess: () => void,
    onError: (e: string) => void
  ) => {
    if (!validateEmail(email)) {
      onError("כתובת הדואר אינה תקינה");
      return;
    }
    sendPasswordResetEmail(getAuth(), email)
      .then(onSuccess)
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            onError("כתובת הדואר אינה תקינה");
            return;

          case "auth/user-not-found":
            onError("המשתמש לא נמצא");
            return;

          case "auth/too-many-requests":
            onError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
            return;

          case "auth/network-request-failed":
            onError("בעיית רשת, אנא נסה שוב בעתיד");
            return;

          default:
            onError(error.message);
            console.error(
              "Reset password error code without translation: " + error.code
            );
            return;
        }
      });
  };

  const goToSignIn = () => {
    navigate(-1);
  };

  return (
    <ResetPasswordScreen
      onResetPassword={onResetPassword}
      goToSignIn={goToSignIn}
    />
  );
}
