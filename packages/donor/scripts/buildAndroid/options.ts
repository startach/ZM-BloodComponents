import { Options } from "yargs";

export const keystore: Options = {
  type: "string",
  description: "path to keystore file",
  alias: "ks",
};

export const alias: Options = {
  type: "string",
  description: "certificate name",
  alias: "a",
};

export const output: Options = {
  type: "string",
  description: "signed file output path",
  alias: "o",
};

export const storepass: Options = {
  type: "string",
  description: "used to protect the integrity of the keystore",
};
export const keypass: Options = {
  type: "string",
  description:
    "password used to protect the private key of the generated key pair. If password is not provided, the user is prompted for it. If RETURN is pressed at the prompt, the key password is set to the same password as that used for the keystore. keypass must be at least 6 characters lon",
};
