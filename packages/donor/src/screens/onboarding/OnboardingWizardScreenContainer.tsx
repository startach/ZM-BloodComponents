import { useHistory } from "react-router-dom";
import { AuthenticationScreenKeys } from "../../navigation/authentication/AuthenticationScreenKeys";
import OnboardingWizardScreen from "./OnboardingWizardScreen";

export default function OnboardingWizardScreenContainer() {
  const history = useHistory();

  return (
    <OnboardingWizardScreen
      goToLogin={() => history.push(AuthenticationScreenKeys.Login)}
      onFinish={() => history.push(AuthenticationScreenKeys.Register)}
    />
  );
}
