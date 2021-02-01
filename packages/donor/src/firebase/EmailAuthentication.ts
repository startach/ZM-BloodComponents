import firebase from "firebase";

export function signInWithEmail(
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
          emailError(t("authenticationErrors.invalidEmail"));
          return;

        case "auth/wrong-password":
          passwordError(t("authenticationErrors.wrongPassword"));
          return;

        case "auth/user-disabled":
          emailError(t("authenticationErrors.invalidEmail"));
          return;

        case "auth/user-not-found":
          emailError(t("authenticationErrors.invalidEmail"));
          return;

        case "auth/too-many-requests":
          emailError(t("authenticationErrors.tooManyRequests"));
          return;

        case "auth/network-request-failed":
          emailError(t("authenticationErrors.networkRequestFailed"));
          return;

        default:
          emailError(error.message);
          console.warn("Sing in error code without translation: " + error.code);
          return;
      }
    });
}

export function resetPassword(
  email: string,
  onSuccess: () => void,
  onError: (message: string) => void
) {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(onSuccess)
    .catch((error: firebase.auth.Error) => {
      switch (error.code) {
        case "auth/invalid-email":
          onError(t("authenticationErrors.invalidEmail"));
          return;

        case "auth/user-not-found":
          onError(t("authenticationErrors.userNotFound"));
          return;

        case "auth/too-many-requests":
          onError(t("authenticationErrors.tooManyRequests"));
          return;

        case "auth/network-request-failed":
          onError(t("authenticationErrors.networkRequestFailed"));
          return;

        default:
          onError(error.message);
          console.warn(
            "Reset password error code without translation: " + error.code
          );
          return;
      }
    });
}

function t(key: string) {
  switch (key) {
    case "authenticationErrors.invalidEmail":
      return "דוא״ל לא תקין";

    case "authenticationErrors.wrongPassword":
      return "סיסמה שגויה";

    case "authenticationErrors.tooManyRequests":
      return "לא ניתן להתחבר כעת, נסה מאוחר יותר";

    case "authenticationErrors.networkRequestFailed":
      return "בעיית רשת, אנא נסה מאוחר יותר";

    case "authenticationErrors.userNotFound":
      return "משתמש לא נמצא";
  }

  return "אנא נסה מאוחר יותר";
}
