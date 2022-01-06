import { Navigate, useNavigate } from "react-router-dom";
import OnboardingWizardScreen from "./OnboardingWizardScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

export const WIZARD_SEEN_KEY = "sawWizardScreen";

export default function OnboardingWizardScreenContainer() {
  const navigate = useNavigate();
  if (localStorage.getItem(WIZARD_SEEN_KEY)) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  return (
    <OnboardingWizardScreen
      goToLogin={() => {
        navigate(MainNavigationKeys.Login);
      }}
      onFinish={() => {
        localStorage.setItem(WIZARD_SEEN_KEY, "true");
        navigate(MainNavigationKeys.BookDonation);
      }}
    />
  );
}
