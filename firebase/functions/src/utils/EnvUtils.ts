import * as functions from "firebase-functions";

export function isProd() {
  const env = functions.config().functions.env;
  switch (env) {
    case "prod":
      return true;

    case "stg":
      return false;

    default:
      throw new Error("Invalid environment");
  }
}
