import firebase from "firebase/app";
import "firebase/auth";
import HomeScreen from "./HomeScreen";
import { MainNavigationKeys } from "../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";
import { Donor } from "@zm-blood-components/common";

interface HomeScreenContainerProps {
  user: Donor;
}

export default function HomeScreenContainer(props: HomeScreenContainerProps) {
  const history = useHistory();

  const signOut = () => {
    return firebase.auth().signOut();
  };

  return (
    <HomeScreen
      firstName={props.user.firstName}
      onSignOut={signOut}
      goToBookDonationScreen={() => {
        history.push(MainNavigationKeys.BookDonation);
      }}
      goToUpcomingDonationScreen={() =>
        history.push(MainNavigationKeys.UpcomingDonation)
      }
      goToMyProfileScreen={() => history.push(MainNavigationKeys.MyProfile)}
      goToQuestionnaire={() => history.push(MainNavigationKeys.Questionnaire)}
    />
  );
}
