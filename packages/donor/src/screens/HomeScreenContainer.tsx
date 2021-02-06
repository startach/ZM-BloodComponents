import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import HomeScreen from "./HomeScreen";
import { MainNavigationKeys } from "../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";

export default function HomeScreenContainer() {
  const history = useHistory();

  const signOut = () => {
    return firebase.auth().signOut();
  };

  return (
    <HomeScreen
      onSignOut={signOut}
      goToBookDonationScreen={() => {
        history.push(MainNavigationKeys.BookDonation);
      }}
      goToExtendedSignupScreen={() =>
        history.push(MainNavigationKeys.ExtendedSignup)
      }
      goToUpcomingDonationScreen={() =>
        history.push(MainNavigationKeys.UpcomingDonation)
      }
      goToMyProfileScreen={() => history.push(MainNavigationKeys.MyProfile)}
    />
  );
}
