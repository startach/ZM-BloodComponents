import React from "react";
import HomeScreen from "./HomeScreen";
import firebase from 'firebase';

export default function () {
  const signOut = () => {
   return firebase.auth().signOut();
  }

  return <HomeScreen onSignOut={signOut} />;
}
