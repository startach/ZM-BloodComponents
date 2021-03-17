import CoordinatorSignInScreen from "./CoordinatorSignInScreen";
import { signInWithEmail } from "../../firebase/FirebaseAuthentication";

export default function CoordinatorSignInScreenContainer() {
  return <CoordinatorSignInScreen onSignInWithEmail={signInWithEmail} />;
}
