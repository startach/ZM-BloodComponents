import { BloodType, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import MyProfileScreen from "./MyProfileScreen";
import { Navigate, useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface MyProfileScreenContainerProps {
  loggedIn: boolean;
  user: Donor;
  updateUserInAppState: (user: Donor) => void;
}

export default function MyProfileScreenContainer(
  props: MyProfileScreenContainerProps
) {
  const navigate = useNavigate();
  if (!props.loggedIn) {
    return <Navigate to={MainNavigationKeys.Login} />;
  }

  const onSave = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    bloodType: BloodType,
    enableEmailNotifications: boolean
  ) => {
    const updatedUser = await FirebaseFunctions.saveDonor(
      firstName,
      lastName,
      "",
      phoneNumber,
      bloodType,
      enableEmailNotifications
    );
    props.updateUserInAppState(updatedUser);
    navigate(-1);
  };

  return <MyProfileScreen onSave={onSave} user={props.user} />;
}
