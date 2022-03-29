import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import { DbCoordinator } from "../function-types";
import { expectThrows } from "../testUtils/TestUtils";
import { validateAppointmentEditPermissions } from "./UserValidator";

const COORDINATOR_ID = "coordinatorId";

describe("User Validator", () => {
  test("validate - No coordinator throws", () => {
    expectThrows(
      () => validateAppointmentEditPermissions(Hospital.ASAF_HAROFE, undefined),
      "User is not a coordinator and can't edit appointments"
    );
  });

  test("validate - Hospital coordinator with no hospitals throws", () => {
    const dbCoordinator = {
      id: COORDINATOR_ID,
      role: CoordinatorRole.HOSPITAL_COORDINATOR,
      hospitals: [],
    } as DbCoordinator;

    expectThrows(
      () =>
        validateAppointmentEditPermissions(Hospital.ASAF_HAROFE, dbCoordinator),
      "Coordinator has no permissions for hospital"
    );
  });

  test("validate - Hospital coordinator with the wrong hospital throws", () => {
    const dbCoordinator = {
      id: COORDINATOR_ID,
      role: CoordinatorRole.HOSPITAL_COORDINATOR,
      hospitals: [Hospital.TEL_HASHOMER],
    } as DbCoordinator;

    expectThrows(
      () =>
        validateAppointmentEditPermissions(Hospital.ASAF_HAROFE, dbCoordinator),
      "Coordinator has no permissions for hospital"
    );
  });

  test.each([
    Hospital.TEL_HASHOMER,
    Hospital.ASAF_HAROFE,
    Hospital.BEILINSON,
    Hospital.HADASA_EIN_KEREM,
  ])(
    "validate - SYSTEM_USER has permissions to all hospitals - %s",
    (hospital) => {
      const dbCoordinator = {
        id: COORDINATOR_ID,
        role: CoordinatorRole.SYSTEM_USER,
      } as DbCoordinator;

      validateAppointmentEditPermissions(hospital, dbCoordinator);
    }
  );

  test("validate - ADVOVATE throws", () => {
    const dbCoordinator = {
      id: COORDINATOR_ID,
      role: CoordinatorRole.ADVOCATE,
    } as DbCoordinator;

    expectThrows(
      () =>
        validateAppointmentEditPermissions(Hospital.ASAF_HAROFE, dbCoordinator),
      "Coordinator has no permissions for hospital"
    );
  });
});
