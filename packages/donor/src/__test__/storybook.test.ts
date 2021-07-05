import "jest-canvas-mock";

import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
initStoryshots({
  framework: "react",
  test: multiSnapshotWithOptions(),
  storyKindRegex: /^((?!.*?DontTest).)*$/,
});
