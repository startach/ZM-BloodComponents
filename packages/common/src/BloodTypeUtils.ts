import { BloodType, SelectOption } from "./types";
import { LocaleUtils } from "./index";

export function getBloodTypeSelectOptionsWithDefault(defaultLabel: string) {
  const bloodTypeOptions: SelectOption<
    BloodType | ""
  >[] = getBloodTypeSelectOptions();
  bloodTypeOptions.unshift({
    key: "undefined",
    value: "",
    label: defaultLabel,
  });
  return bloodTypeOptions;
}

export function getBloodTypeSelectOptions() {
  return Object.values(BloodType).map<SelectOption<BloodType>>(
    (type, index) => {
      return {
        key: index + type,
        value: type,
        label: LocaleUtils.getBloodTypeTranslation(BloodType[type]),
      };
    }
  );
}
