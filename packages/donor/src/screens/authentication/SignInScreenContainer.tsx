import React from "react";
import SignInScreen from "./SignInScreen";
import { INavigation } from "../../interfaces/INavigation";
import { AuthenticationScreenKeys } from "../../navigator/authentication/AuthenticationScreenKeys";
import firebase from "firebase";

export default function (props: INavigation<AuthenticationScreenKeys.SignIn>) {
  const onRegister = () => {
    props.navigation.navigate(AuthenticationScreenKeys.Register);
  };
  const onResetPassword = () => {
    props.navigation.navigate(AuthenticationScreenKeys.ResetPassword);
  };

  return (
    <SignInScreen
      onSignInWithEmail={signInWithEmail}
      onRegister={onRegister}
      onResetPassword={onResetPassword}
    />
  );
}

function signInWithEmail(
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error: firebase.auth.Error) => {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/user-disabled":
          emailError("כתובת הדואר אינה תקינה");
          return;

        case "auth/wrong-password":
          passwordError("סיסמה שגויה");
          return;

        case "auth/too-many-requests":
          emailError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
          return;

        case "auth/network-request-failed":
          emailError("בעיית רשת, אנא נסה שוב בעתיד");
          return;

        default:
          emailError(error.message);
          console.warn("Sing in error code without translation: " + error.code);
          return;
      }
    });
}
