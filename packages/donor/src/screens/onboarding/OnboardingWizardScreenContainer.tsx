import { useHistory } from "react-router-dom";
import OnboardingWizardScreen from "./OnboardingWizardScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

export default function OnboardingWizardScreenContainer() {
  const history = useHistory();
  localStorage.setItem("sawWizardScreen", "true");

  return (
    <OnboardingWizardScreen
      goToLogin={() => history.push(MainNavigationKeys.Login)}
      onFinish={() => history.push(MainNavigationKeys.BookDonation)}
    />
  );
}
