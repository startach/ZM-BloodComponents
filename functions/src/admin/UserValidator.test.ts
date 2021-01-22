import * as UserValidator from "./UserValidator";
import { Hospital } from "../Types";

test("validate throws if user id is undefinedZ", async () => {
  const userId = undefined;
  const hospitals: Hospital[] = [];
  const db = {} as FirebaseFirestore.Firestore;

  // UserValidator.validateAppointmentEditPermissions(
  //   userId,
  //   hospitals,
  //   db
  // ).catch((error: Error) =>
  //   expect(error.message).toEqual(
  //     "User must be authenticated to add new appointments"
  //   )
  // );

  let error;
  try {
    await UserValidator.validateAppointmentEditPermissions(
      userId,
      hospitals,
      db
    );
  } catch (e) {
    error = e;
  }

  expect(error).toEqual(
    new Error("User must be authenticated to add new appointments")
  );
});
