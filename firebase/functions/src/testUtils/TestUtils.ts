import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import { DbCoordinator } from "../function-types";

export async function expectAsyncThrows(
  action: () => Promise<any>,
  expectedExceptionText: string
) {
  let error;
  try {
    await action();
  } catch (e) {
    error = e;
  }

  // @ts-ignore
  expect(error).toEqual(new Error(expectedExceptionText));
}

export function expectThrows(action: () => any, expectedExceptionText: string) {
  let error;
  try {
    action();
  } catch (e) {
    error = e;
  }

  // @ts-ignore
  expect(error).toEqual(new Error(expectedExceptionText));
}

export function getDate(daysFromNow: number) {
  const res = new Date();
  res.setDate(res.getDate() + daysFromNow);
  return res;
}

export function createDbDonor(
  id: string,
  role: CoordinatorRole,
  hospitals: Hospital[] = []
) {
  switch (role) {
    case CoordinatorRole.SYSTEM_USER:
    case CoordinatorRole.ADVOCATE:
      return {
        id: id,
        role,
      };
    case CoordinatorRole.HOSPITAL_COORDINATOR:
      return {
        id: id,
        role,
        hospitals: hospitals,
      };
  }

  throw new Error("Unknown role for creating a coordinator");
}
