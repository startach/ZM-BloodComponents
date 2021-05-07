import * as admin from "firebase-admin";
import { Collections, DbGroup } from "@zm-blood-components/common";

export async function createGroup(name: string, coordinatorId: string) {
  const newGroupDoc = admin.firestore().collection(Collections.GROUPS).doc();
  const dbGroup: DbGroup = {
    id: newGroupDoc.id,
    name,
    coordinatorId,
  };
  await newGroupDoc.set(dbGroup);
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
): Promise<string[]> {
  const querySnapshot = await admin
    .firestore()
    .collection(Collections.GROUPS)
    .where("coordinatorId", "==", coordinatorId)
    .get();
  return querySnapshot.docs.map((doc) => doc.id);
}
