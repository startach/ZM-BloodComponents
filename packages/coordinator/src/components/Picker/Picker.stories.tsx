import Picker from "./Picker";
import {
  BloodType,
  BloodTypeUtils,
  SelectOption,
} from "@zm-blood-components/common";
import { useState } from "react";
import styles from "./Picker.module.scss";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";

export default {
  component: Picker,
  title: "Components/Picker",
} as Meta;

export const BloodTypePicker = () => {
  const [selected, setSelected] = useState<BloodType | undefined>();
  return (
    <Picker
      label={"בחר/י את סוג הדם שלך"}
      options={BloodTypeUtils.getBloodTypeSelectOptions()}
      value={selected}
      onChange={(newValue) => {
        action("onChange")(newValue);
        setSelected(newValue);
      }}
      buttonClassName={styles.storyBloodTypeButton}
    />
  );
};

export const DonationTimesPicker = () => {
  const [selected, setSelected] = useState<string | undefined>();
  const availableSlots = [
    "10:30",
    "10:50",
    "11:15",
    "11:40",
    "13:30",
    "13:50",
    "14:15",
    "16:40",
    "17:20",
    "17:30",
  ];
  const options = availableSlots.map<SelectOption<string>>((time, index) => {
    return {
      key: index + time,
      value: time,
      label: time,
    };
  });

  return (
    <Picker
      label={"בחר/י תור פנוי"}
      options={options}
      value={selected}
      onChange={(newValue) => {
        action("onChange")(newValue);
        setSelected(newValue);
      }}
    />
  );
};
