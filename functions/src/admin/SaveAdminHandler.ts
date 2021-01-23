import { CallableContext } from "firebase-functions/lib/providers/https";
import { validateUserCanSetRoleToAnotherUser } from "./UserValidator";
import { Admin } from "../Types";
import { setAdmin } from "../firestore/AdminDataAccessLayer";

interface SaveAdminRequest {
  admin: Admin;
}

export default async function (
  request: SaveAdminRequest,
  context: CallableContext
) {
  await validateUserCanSetRoleToAnotherUser(context.auth?.uid);

  await setAdmin(request.admin);
}
