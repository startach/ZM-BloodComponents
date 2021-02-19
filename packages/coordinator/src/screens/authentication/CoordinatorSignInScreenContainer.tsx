import React from "react";
import CoordinatorSignInScreen from "./CoordinatorSignInScreen";
import firebase from "firebase/app";
import "firebase/auth";

export default function CoordinatorSignInScreenContainer() {
  return <CoordinatorSignInScreen onSignInWithEmail={signInWithEmail} />;
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
          emailError("כתובת הדואר אינה תקינה");
          return;

        case "auth/user-not-found":
          emailError("כתובת הדואר אינה רשומה");
          return;

        case "auth/user-disabled":
          emailError("כתובת הדואר אינה פעילה");
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
