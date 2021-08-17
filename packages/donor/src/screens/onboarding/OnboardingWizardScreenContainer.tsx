import { useHistory } from "react-router-dom";
import OnboardingWizardScreen from "./OnboardingWizardScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

export const WIZARD_SEEN_KEY = "sawWizardScreen";

export default function OnboardingWizardScreenContainer() {
  const history = useHistory();


  return (
    <OnboardingWizardScreen
      goToLogin={() => history.push(MainNavigationKeys.Login)}
      onFinish={() => {
        localStorage.setItem(WIZARD_SEEN_KEY, "true");
        history.push(MainNavigationKeys.BookDonation)}
      }
    />
  );
}
