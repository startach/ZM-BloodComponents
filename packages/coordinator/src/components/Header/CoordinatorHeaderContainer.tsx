import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import CoordinatorHeader from "./CoordinatorHeader";

interface CoordinatorHeaderContainerProps {
  showSignOutButton: boolean;
}

export default function CoordinatorHeaderContainer(
  props: CoordinatorHeaderContainerProps
) {
  const onSignOut = () => firebase.auth().signOut();

  return (
    <CoordinatorHeader
      showSignOutButton={props.showSignOutButton}
      onSignOut={onSignOut}
    />
  );
}
