import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";
import DonationProcessScreen from "./DonationProcessScreen";
import { LoginStatus } from "@zm-blood-components/common";

interface DonationProcessScreenContainerProps {
  userLoggedIn: LoginStatus;
  userName: string;
}

export default function DonationProcessScreenContainer(
  props: DonationProcessScreenContainerProps
) {
  const history = useHistory();

  return (
    <DonationProcessScreen
      onContact={() => history.replace("/" + MainNavigationKeys.Contact)}
      userLoggedIn={props.userLoggedIn}
      userName={props.userName}
    />
  );
}
