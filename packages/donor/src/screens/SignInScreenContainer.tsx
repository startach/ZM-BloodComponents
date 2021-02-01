import React from "react";
import SignInScreen from "./SignInScreen";
import { signInWithEmail } from "../firebase/EmailAuthentication";

export default function () {
  return <SignInScreen onSignInWithEmail={signInWithEmail} />;
}
