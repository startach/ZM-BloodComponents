import { CallableContext } from "firebase-functions/lib/providers/https";
import * as functions from "firebase-functions";

export type RequestHandler<T> = (request: T, callerId: string) => Promise<any>;
export type UnauthenticatedRequestHandler<T> = (request: T) => Promise<any>;

export function handler<T>(requestHandler: RequestHandler<T>) {
  return functions.https.onCall(async (data: T, context: CallableContext) => {
    const callerId = context.auth?.uid;
    functions.logger.info(
      `Handling request from ${callerId}: ${JSON.stringify(data)}`
    );
    if (!callerId) {
      throw new Error("Unauthorized");
    }

    try {
      const response = await requestHandler(data, callerId);
      functions.logger.info(`Response: ${JSON.stringify(response)}`);
      return response;
    } catch (e) {
      functions.logger.error(
        `Error handling request from ${callerId}: ${JSON.stringify(data)}}`,
        e
      );
      throw e;
    }
  });
}

export function unauthenticatedHandler<T>(
  requestHandler: UnauthenticatedRequestHandler<T>
) {
  return functions.https.onCall(async (data: T) => {
    return await requestHandler(data);
  });
}
