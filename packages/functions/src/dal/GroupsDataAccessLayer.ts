import * as admin from "firebase-admin";
import { Collections, DbGroup } from "@zm-blood-components/common";

export async function createGroup(
  name: string,
  coordinatorId: string
): Promise<DbGroup> {
  const newGroupDoc = admin.firestore().collection(Collections.GROUPS).doc();
  const dbGroup: DbGroup = {
    id: newGroupDoc.id,
    name,
    coordinatorId,
  };
  await newGroupDoc.set(dbGroup);
  return dbGroup;
}

export async function deleteGroup(groupId: string) {
  const collection = admin.firestore().collection(Collections.GROUPS);
  await collection.doc(groupId).delete();
}

export async function getGroup(groupId: string) {
  const collection = admin.firestore().collection(Collections.GROUPS);
  const group = await collection.doc(groupId).get();

  if (!group.exists) {
    return undefined;
  }

  return group.data() as DbGroup;
}

export async function getGroupIdsOfCoordinatorId(
  coordinatorId: string
): Promise<Set<string>> {
  const querySnapshot = await admin
    .firestore()
    .collection(Collections.GROUPS)
    .where("coordinatorId", "==", coordinatorId)
    .get();
  return new Set<string>(querySnapshot.docs.map((doc) => doc.id));
}
