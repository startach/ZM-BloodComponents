import * as admin from "firebase-admin";
import { Collections, DbDonor } from "@zm-blood-components/common";
import * as _ from "lodash";

export async function getDonorOrThrow(donorId: string) {
  const donor = await getDonor(donorId);
  if (!donor) {
    throw Error("Donor not found");
  }
  return donor;
}

export async function getDonors(donorIds: string[]): Promise<DbDonor[]> {
  const collection = admin.firestore().collection(Collections.DONORS);

  // Firebase supports up to 10 ids per "in" request
  const chunks = _.chunk(donorIds, 10);

  const promisesArray = chunks.map(
    (chunk) =>
      collection
        .where(admin.firestore.FieldPath.documentId(), "in", chunk)
        .get() as Promise<FirebaseFirestore.QuerySnapshot<DbDonor>>
  );

  const snapshots = await Promise.all(promisesArray);
  const docs = _.flatMap(snapshots, (s) => s.docs);
  return _.map(docs, (a) => ({
    ...a.data(),
    id: a.id,
  }));
}

export async function getDonor(donorId: string) {
  const collection = admin.firestore().collection(Collections.DONORS);
  const donor = await collection.doc(donorId).get();

  if (!donor.exists) {
    return undefined;
  }

  return donor.data() as DbDonor;
}

export async function setDonor(donor: DbDonor) {
  const collection = admin.firestore().collection(Collections.DONORS);
  await collection.doc(donor.id).set(donor);
}

export async function deleteDonor(donorId: string) {
  const collection = admin.firestore().collection(Collections.DONORS);
  await collection.doc(donorId).delete();
}

export async function getAllDonors(): Promise<DbDonor[]> {
  const snapshot = await admin.firestore().collection(Collections.DONORS).get();
  return snapshot.docs.map<DbDonor>((doc) => doc.data() as DbDonor);
}
