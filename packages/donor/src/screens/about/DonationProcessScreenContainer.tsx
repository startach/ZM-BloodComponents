import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";
import DonationProcessScreen from "./DonationProcessScreen";

interface DonationProcessScreenContainerProps {
  isUserLoggedIn: boolean;
}

export default function DonationProcessScreenContainer(
  props: DonationProcessScreenContainerProps
) {
  const history = useHistory();
  const { isUserLoggedIn } = props;

  return (
    <DonationProcessScreen
      onContact={() => history.replace("/" + MainNavigationKeys.Contact)}
      isUserLoggedIn={isUserLoggedIn}
    />
  );
}
