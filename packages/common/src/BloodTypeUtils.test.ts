import { getBloodTypeSelectOptionsWithDefault } from "./BloodTypeUtils";
import { BloodType } from "./types";
import { getBloodTypeTranslation } from "./LocaleUtils";

test("getBloodTypeSelectOptionsWithDefault", () => {
  const options = getBloodTypeSelectOptionsWithDefault("CHOOSE");

  expect(options).toHaveLength(4 * 2 + 1 + 1);

  expect(options[0].value).toEqual("");
  expect(options[0].label).toEqual("CHOOSE");

  // Assert UNSPECIFIED is the last option
  expect(options[options.length - 1].value).toEqual(BloodType.NOT_SURE);
  expect(options[options.length - 1].label).toEqual(
    getBloodTypeTranslation(BloodType.NOT_SURE)
  );
});
