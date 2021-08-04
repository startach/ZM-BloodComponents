import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";
import DonationProcessScreen from "./DonationProcessScreen";
import { Donor } from "common/src/types";

interface DonationProcessScreenContainerProps {
  isLoggedIn: boolean;
  user?: Donor;
}

export default function DonationProcessScreenContainer(
  props: DonationProcessScreenContainerProps
) {
  const history = useHistory();

  return (
    <DonationProcessScreen
      onContact={() => history.replace("/" + MainNavigationKeys.Contact)}
      firstName={props.user?.firstName}
    />
  );
}
