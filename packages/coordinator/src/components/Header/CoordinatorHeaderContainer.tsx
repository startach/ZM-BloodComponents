import CoordinatorHeader, { HeaderButtonFlags } from "./CoordinatorHeader";
import { signOut, getEmail } from "../../firebase/FirebaseAuthentication";
import { Coordinator } from "@zm-blood-components/common";

interface CoordinatorHeaderContainerProps {
  flags: HeaderButtonFlags;
  coordinator: Coordinator | undefined;
}

export default function CoordinatorHeaderContainer({
  flags,
  coordinator,
}: CoordinatorHeaderContainerProps) {
  return (
    <CoordinatorHeader
      flags={flags}
      onSignOut={signOut}
      getEmail={getEmail}
      coordinator={coordinator}
    />
  );
}
