import CoordinatorHeader, { HeaderButtonFlags } from "./CoordinatorHeader";
import { getEmail, signOut } from "../../../firebase/FirebaseAuthentication";
import { Coordinator } from "@zm-blood-components/common";
import { useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  return (
    <CoordinatorHeader
      flags={flags}
      onSignOut={signOut}
      getEmail={getEmail}
      coordinator={coordinator}
      currentLocationPathname={location.pathname}
      navigate={(screen: CoordinatorScreenKey) => () => navigate("/" + screen)}
    />
  );
}
