import { getAuth } from "firebase/auth";

export function signOut() {
  return getAuth().signOut();
}
