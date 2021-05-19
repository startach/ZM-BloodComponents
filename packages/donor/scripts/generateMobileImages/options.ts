import { Options } from "yargs";

export const android: Options = {
  type: "boolean",
  description: "generate android images",
  default: false,
};

export const ios: Options = {
  type: "boolean",
  description: "generate ios images",
  default: false,
};

export const cleanup: Options = {
  type: "boolean",
  description: "remove generated temp directory",
  default: false,
};
