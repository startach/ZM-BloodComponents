import { BloodType, SelectOption } from "./types";
import { LocaleUtils } from "./index";

export function getBloodTypeSelectOptions() {
  return [
    BloodType.A_MINUS,
    BloodType.A_PLUS,
    BloodType.B_MINUS,
    BloodType.B_PLUS,
    BloodType.AB_MINUS,
    BloodType.AB_PLUS,
    BloodType.O_MINUS,
    BloodType.O_PLUS,
    BloodType.NOT_SURE,
  ].map<SelectOption<BloodType>>((type, index) => {
    return {
      key: index + type,
      value: type,
      label: LocaleUtils.getBloodTypeTranslation(BloodType[type]),
    };
  });
}
