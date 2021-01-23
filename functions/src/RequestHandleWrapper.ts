import { CallableContext } from "firebase-functions/lib/providers/https";
import * as functions from "firebase-functions";

export type RequestHandler<T> = (
  request: T,
  context: CallableContext
) => Promise<any>;

export function handler<T>(requestHandler: RequestHandler<T>) {
  return functions.https.onCall(async (data: any, context: CallableContext) => {
    const request = data as T;
    return await requestHandler(request, context);
  });
}
