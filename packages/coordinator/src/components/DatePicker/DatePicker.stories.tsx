import DatePicker, { DatePickerProps } from "./DatePicker";
import { Meta } from "@storybook/react";

export default {
  component: DatePicker,
  title: "Components/Date Picker",
  parameters: { layout: "padded" },
} as Meta;

const props: DatePickerProps = {
  label: "בחר שעה",
  onChange: () => {},
  value: new Date(),
};

export const Default = (args: DatePickerProps) => {
  return <DatePicker {...args} />;
};

Default.args = props;
