import React from "react";
import HomeScreen from "./HomeScreen";
import firebase from "firebase";
import { INavigation } from "../interfaces/INavigation";
import { MainNavigationKeys } from "../navigator/app/MainNavigationKeys";

export default function (props: INavigation<MainNavigationKeys.Home>) {
  const signOut = () => {
    return firebase.auth().signOut();
  };

  return (
    <HomeScreen
      onSignOut={signOut}
      goToBookDonationScreen={() =>
        props.navigation.navigate(MainNavigationKeys.BookDonation)
      }
      goToExtendedSignupScreen={() =>
        props.navigation.navigate(MainNavigationKeys.ExtendedSignup)
      }
      goToUpcomingDonationScreen={() =>
        props.navigation.navigate(MainNavigationKeys.UpcomingDonation)
      }
    />
  );
}
