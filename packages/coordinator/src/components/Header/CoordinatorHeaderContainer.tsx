import React from "react";
import CoordinatorHeader from "./CoordinatorHeader";
import { signOut } from "../../firebase/FirebaseAuthentication";

interface CoordinatorHeaderContainerProps {
  showSignOutButton: boolean;
}

export default function CoordinatorHeaderContainer(
  props: CoordinatorHeaderContainerProps
) {
  return (
    <CoordinatorHeader
      showSignOutButton={props.showSignOutButton}
      onSignOut={signOut}
    />
  );
}
