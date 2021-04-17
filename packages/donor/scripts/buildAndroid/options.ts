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
