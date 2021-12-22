import { Meta, Story } from "@storybook/react";
import Toggle, { ToggleProps } from "./Toggle";
import { useState } from "react";

export default {
  title: "Components/Toggle",
  component: Toggle,
} as Meta;

const Template: Story<ToggleProps> = (args) => {
  const [enabled, setEnabled] = useState(args.enabled);
  return <Toggle enabled={enabled} onChange={setEnabled} />;
};

export const Default = Template.bind({});
Default.args = {
  enabled: false,
};

export const Toggled = Template.bind({});
Toggled.args = {
  enabled: true,
};
