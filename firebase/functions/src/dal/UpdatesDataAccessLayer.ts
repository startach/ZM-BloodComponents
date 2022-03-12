import * as admin from "firebase-admin";
import {
  Collections,
  CoordinatorUpdate,
  Hospital,
} from "@zm-blood-components/common";

export async function setCoordinatorUpdate(hospital: Hospital, userId: string) {
  const collection = admin.firestore().collection(Collections.UPDATES);

  const update: CoordinatorUpdate = {
    userId,
    hospital,
    time: admin.firestore.Timestamp.now(),
  };

  await collection.doc("coordinatorUpdates").set(update);
}
