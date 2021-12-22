import CoordinatorHeader, { HeaderButtonFlags } from "./CoordinatorHeader";
import { signOut, getEmail } from "../../../firebase/FirebaseAuthentication";
import { Coordinator } from "@zm-blood-components/common";
import { useHistory, useLocation } from "react-router-dom";
import { CoordinatorScreenKey } from "coordinator/src/navigation/CoordinatorScreenKey";

interface CoordinatorHeaderContainerProps {
  flags: HeaderButtonFlags;
  coordinator: Coordinator | undefined;
}

export default function CoordinatorHeaderContainer({
  flags,
  coordinator,
}: CoordinatorHeaderContainerProps) {
  const location = useLocation();

  const history = useHistory();
  const navigate = (screen: CoordinatorScreenKey) => () =>
    history.push("/" + screen);

  return (
    <CoordinatorHeader
      flags={flags}
      onSignOut={signOut}
      getEmail={getEmail}
      coordinator={coordinator}
      currentLocationPathname={location.pathname}
      navigate={navigate}
    />
  );
}
