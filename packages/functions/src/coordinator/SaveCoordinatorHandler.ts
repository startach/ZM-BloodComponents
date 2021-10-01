import { CoordinatorRole, FunctionsApi } from "@zm-blood-components/common";
import { getCoordinator, setAdmin } from "../dal/AdminDataAccessLayer";
import { DbCoordinator } from "../function-types";

export default async function (
  request: FunctionsApi.SaveCoordinatorRequest,
  callerId: string
) {
  await validateUserCanSetRoleToAnotherUser(callerId);

  await setAdmin({
    id: callerId,
    ...request.coordinator,
  });
}

async function validateUserCanSetRoleToAnotherUser(
  callingUser: string | undefined
) {
  if (!callingUser) {
    throw new Error("User must be authenticated to edit coordinators");
  }

  const callingAdmin = await getCoordinator(callingUser);
  if (!callingAdmin) {
    throw Error("User is not an coordinator and can't edit coordinators");
  }

  if (!adminAllowedToSetRoles(callingAdmin)) {
    throw Error("User role is not authorized to edit coordinators");
  }
}

function adminAllowedToSetRoles(callingAdmin: DbCoordinator) {
  if (callingAdmin.role === CoordinatorRole.SYSTEM_USER) {
    return true;
  }

  return false;
}
