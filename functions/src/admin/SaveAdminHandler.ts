import { CallableContext } from "firebase-functions/lib/providers/https";
import { Admin, AdminRole } from "../Types";
import { getAdmin, setAdmin } from "../dal/AdminDataAccessLayer";

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

async function validateUserCanSetRoleToAnotherUser(
  callingUser: string | undefined
) {
  if (!callingUser) {
    throw new Error("User must be authenticated to edit admins");
  }

  const callingAdmin = await getAdmin(callingUser);
  if (!callingAdmin) {
    throw Error("User is not an admin and can't edit admins");
  }

  if (!adminAllowedToSetRoles(callingAdmin)) {
    throw Error("User role is not authorized to edit admins");
  }
}

function adminAllowedToSetRoles(callingAdmin: Admin) {
  for (const roleIndex in callingAdmin.roles) {
    switch (callingAdmin.roles[roleIndex]) {
      case AdminRole.SYSTEM_USER:
      case AdminRole.ZM_MANAGER:
        return true;
    }
  }

  return false;
}
