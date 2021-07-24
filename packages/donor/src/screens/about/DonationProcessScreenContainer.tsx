import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { useHistory } from "react-router-dom";
import DonationProcessScreen from "./DonationProcessScreen";

interface DonationProcessScreenContainerProps {}

export default function DonationProcessScreenContainer(
  props: DonationProcessScreenContainerProps
) {
  const history = useHistory();

  return (
    <DonationProcessScreen
      onContact={() => history.replace("/" + MainNavigationKeys.Contact)}
    />
  );
}
