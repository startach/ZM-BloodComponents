import { Meta } from "@storybook/react";
import { useState } from "react";
import CheckBox from "./Checkbox";

export default {
  component: CheckBox,
  title: "Components/Checkbox",
  parameters: { layout: "padded" },
} as Meta;

export const Default = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBox
      label={"קראתי ומאשר/ת שכל המידע לעיל נכון"}
      isChecked={checked}
      onChange={setChecked}
    />
  );
};
