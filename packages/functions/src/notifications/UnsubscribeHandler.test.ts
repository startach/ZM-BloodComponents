import * as Functions from "../index";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, getDonor } from "../dal/DonorDataAccessLayer";
import { saveTestDonor } from "../testUtils/TestSamples";
import "../testUtils/FirebaseTestUtils";
import { Request } from "firebase-functions/lib/providers/https";
import * as express from "express";

const DONOR_ID = "UnsubscribeUserId";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
});

test("No user id throws exception", async () => {
  await expectAsyncThrows(() => callTarget(""), "Invalid user id");
});

test("No method throws exception", async () => {
  await expectAsyncThrows(() => callTarget(DONOR_ID, ""), "Invalid method");
});

test("Invalid method throws exception", async () => {
  await expectAsyncThrows(() => callTarget(DONOR_ID, "post"), "Invalid method");
});

test("No such donor throws exception", async () => {
  await expectAsyncThrows(() => callTarget(DONOR_ID + "###"), "Invalid user");
});

test("Valid request unsubscribes", async () => {
  await saveTestDonor(DONOR_ID);
  const donorBefore = await getDonor(DONOR_ID);
  expect(
    !!donorBefore?.notificationSettings?.disableEmailNotifications
  ).toBeFalsy();

  await callTarget(DONOR_ID);

  const donor = await getDonor(DONOR_ID);
  expect(donor?.notificationSettings?.disableEmailNotifications).toBeTruthy();
});

async function callTarget(userId: string, method = "email") {
  // @ts-ignore
  const request = {
    query: {
      userId,
      method,
    },
  } as Request;

  // @ts-ignore
  const response = {
    send: (x) => expect(x).toEqual("הרישום הוסר בהצלחה"),
  } as express.Response;

  return Functions.unsubscribe(request, response);
}
