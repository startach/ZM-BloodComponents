import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { validateEmail } from "../register/RegisterScreenContainer";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { useHistory } from "react-router-dom";

export default function ResetPasswordScreenContainer() {
  const history = useHistory();

  const onResetPassword = (email: string, onError: (e: string) => void) => {
    if (!validateEmail(email)) {
      onError("כתובת הדואר אינה תקינה");
      return;
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => history.goBack())
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

  const goToSignIn = () => {
    history.goBack();
  };

  return (
    <ResetPasswordScreen
      onResetPassword={onResetPassword}
      goToSignIn={goToSignIn}
    />
  );
}
