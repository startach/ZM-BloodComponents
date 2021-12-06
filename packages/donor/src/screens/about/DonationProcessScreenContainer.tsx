import { useHistory } from "react-router-dom";
import DonationProcessScreen from "./DonationProcessScreen";

export default function DonationProcessScreenContainer() {
  const history = useHistory();

  return <DonationProcessScreen />;
}
