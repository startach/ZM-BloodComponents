import { BloodType, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import MyProfileScreen from "./MyProfileScreen";
import "firebase/auth";

interface MyProfileScreenContainerProps {
  user: Donor;
  updateUserInAppState: (user: Donor) => void;
}

export default function MyProfileScreenContainer(
  props: MyProfileScreenContainerProps
) {
  const onSave = (
    firstName: string,
    lastName: string,
    birthDate: string,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    const updatedUser = FirebaseFunctions.saveDonor(
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      bloodType
    );
    props.updateUserInAppState(updatedUser);
  };

  return <MyProfileScreen onSave={onSave} user={props.user} />;
}
