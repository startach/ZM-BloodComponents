import { Meta, Story } from "@storybook/react";
import Toast, { ToastProps } from "./Toast";
import { useState } from "react";
import Button from "../Button";

export default {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "padded" },
} as Meta;

const Template: Story<ToastProps> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button title={"פתח"} onClick={() => setOpen(true)} />
      <Toast {...args} open={open} setOpen={setOpen} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: "הפעולה בוצעה בהצלחה",
};
