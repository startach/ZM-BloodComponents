import { BloodType, Donor } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { signOut } from "../authentication/FirebaseAuthentication";

interface ExtendedSignupScreenContainerProps {
  updateUserInAppState: (user: Donor) => void;
}

export default function ExtendedSignupScreenContainer(
  props: ExtendedSignupScreenContainerProps
) {
  const onSignOut = () => signOut();

  const onSave = async (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType,
    enableEmailNotifications: boolean
  ) => {
    const newUser = await FirebaseFunctions.saveDonor(
      firstName,
      lastName,
      "", // unused in pilot
      phone,
      bloodType,
      true // true by default for new users
    );
    props.updateUserInAppState(newUser);
  };

  return <ExtendedSignupScreen onSave={onSave} onSignOut={onSignOut} />;
}
