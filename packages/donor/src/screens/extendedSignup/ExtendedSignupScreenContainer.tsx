import firebase from "firebase/app";
import "firebase/auth";
import { BloodType, Donor } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

interface ExtendedSignupScreenContainerProps {
  updateUserInAppState: (user: Donor) => void;
}

export default function ExtendedSignupScreenContainer(
  props: ExtendedSignupScreenContainerProps
) {
  const onSignOut = () => firebase.auth().signOut();

  const onSave = (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType
  ) => {
    const newUser = FirebaseFunctions.saveDonor(
      firstName,
      lastName,
      "", // unused in pilot
      phone,
      bloodType
    );
    props.updateUserInAppState(newUser);
  };

  return <ExtendedSignupScreen onSave={onSave} onSignOut={onSignOut} />;
}
