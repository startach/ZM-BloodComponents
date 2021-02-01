import React from "react";
import firebase from "firebase";
import { INavigation } from "../../interfaces/INavigation";
import { AuthenticationScreenKeys } from "../../navigator/authentication/AuthenticationScreenKeys";
import { validateEmail } from "./RegisterScreenContainer";
import ResetPasswordScreen from "./ResetPasswordScreen";

export default function (
  props: INavigation<AuthenticationScreenKeys.ResetPassword>
) {
  const onResetPassword = (email: string, onError: (e: string) => void) => {
    if (!validateEmail(email)) {
      onError("כתובת הדואר אינה תקינה");
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => props.navigation.goBack())
        .catch((error: firebase.auth.Error) => {
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

  return <ResetPasswordScreen onResetPassword={onResetPassword} />;
}
