import * as admin from "firebase-admin";
import { Collections } from "../Collections";
import { Donor } from "../Types";

export async function getDonor(donorId: string) {
  const collection = admin.firestore().collection(Collections.DONORS);
  const donor = await collection.doc(donorId).get();

  if (!donor.exists) {
    return undefined;
  }

  return donor.data() as Donor;
}

export async function updateDonor(donor: Donor) {
  const collection = admin.firestore().collection(Collections.DONORS);
  await collection.doc(donor.id).set(donor);
}

export async function deleteDonor(donorId: string) {
  const collection = admin.firestore().collection(Collections.DONORS);
  await collection.doc(donorId).delete();
}
