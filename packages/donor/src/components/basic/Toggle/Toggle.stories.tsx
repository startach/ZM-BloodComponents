import { Meta } from "@storybook/react";
import { useState } from "react";
import Toggle from "./Toggle";

export default {
  component: Toggle,
  title: "Components/Toggle",
  parameters: { layout: "padded" },
} as Meta;

export const Default = () => {
  const [value, setValue] = useState(false);

  return (
    <Toggle label={"קבלת תזכורות למייל"} value={value} onChange={setValue} />
  );
};
