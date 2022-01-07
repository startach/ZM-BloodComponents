import CoordinatorHeader, { HeaderButtonFlags } from "./CoordinatorHeader";
import { getEmail, signOut } from "../../../firebase/FirebaseAuthentication";
import { Coordinator } from "@zm-blood-components/common";
import { useLocation } from "react-router-dom";

interface CoordinatorHeaderContainerProps {
  flags: HeaderButtonFlags;
  coordinator: Coordinator | undefined;
}

export default function CoordinatorHeaderContainer({
  flags,
  coordinator,
}: CoordinatorHeaderContainerProps) {
  const location = useLocation();

  return (
    <CoordinatorHeader
      flags={flags}
      onSignOut={signOut}
      getEmail={getEmail}
      coordinator={coordinator}
      currentLocationPathname={location.pathname}
    />
  );
}
