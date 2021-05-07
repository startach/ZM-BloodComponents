import {
  CoordinatorRole,
  DbCoordinator,
  FunctionsApi,
} from "@zm-blood-components/common";
import { getCoordinator, setAdmin } from "../dal/AdminDataAccessLayer";

export default async function (
  request: FunctionsApi.SaveAdminRequest,
  callerId: string
) {
  await validateUserCanSetRoleToAnotherUser(callerId);

  await setAdmin(request.admin);
}

async function validateUserCanSetRoleToAnotherUser(
  callingUser: string | undefined
) {
  if (!callingUser) {
    throw new Error("User must be authenticated to edit admins");
  }

  const callingAdmin = await getCoordinator(callingUser);
  if (!callingAdmin) {
    throw Error("User is not an admin and can't edit admins");
  }

  if (!adminAllowedToSetRoles(callingAdmin)) {
    throw Error("User role is not authorized to edit admins");
  }
}

function adminAllowedToSetRoles(callingAdmin: DbCoordinator) {
  if (callingAdmin.role === CoordinatorRole.SYSTEM_USER) {
    return true;
  }

  return false;
}
