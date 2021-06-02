import CoordinatorHeader, { HeaderButtonFlags } from "./CoordinatorHeader";
import { signOut } from "../../firebase/FirebaseAuthentication";

interface CoordinatorHeaderContainerProps {
  flags: HeaderButtonFlags;
}

export default function CoordinatorHeaderContainer(
  props: CoordinatorHeaderContainerProps
) {
  return <CoordinatorHeader flags={props.flags} onSignOut={signOut} />;
}
