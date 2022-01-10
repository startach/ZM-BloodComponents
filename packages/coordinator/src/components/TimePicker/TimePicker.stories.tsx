import TimePicker, { TimePickerProps } from "./TimePicker";
import { Meta } from "@storybook/react";

export default {
  component: TimePicker,
  title: "Components/Time Picker",
  parameters: { layout: "padded" },
} as Meta;

const props: TimePickerProps = {
  label: "בחר שעה",
  onChange: () => {},
  value: new Date(),
};

export const Default = (args: TimePickerProps) => {
  return <TimePicker {...args} />;
};

Default.args = props;
