import "jest-canvas-mock";
import { createSerializer } from "@emotion/jest";

import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
initStoryshots({
  framework: "react",
  test: multiSnapshotWithOptions(),
  storyKindRegex: /^((?!.*?DontTest).)*$/,
  snapshotSerializers: [createSerializer()],
});
