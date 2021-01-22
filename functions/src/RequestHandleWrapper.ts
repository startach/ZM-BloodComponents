import { CallableContext } from "firebase-functions/lib/providers/https";
import * as functions from "firebase-functions";

export type RequestHandler<T> = (
  request: T,
  context: CallableContext,
  db: FirebaseFirestore.Firestore
) => Promise<any>;

export function handler<T>(
  handler: RequestHandler<T>,
  db: FirebaseFirestore.Firestore
) {
  return functions.https.onCall(async (data: any, context: CallableContext) => {
    const request = data as T;
    return await handler(request, context, db);
  });
}
