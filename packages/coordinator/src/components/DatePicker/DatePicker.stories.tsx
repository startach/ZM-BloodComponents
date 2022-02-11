import DatePicker, { DatePickerProps } from "./DatePicker";
import { Meta, Story } from "@storybook/react";
import NewSlot, { NewSlotProps } from "../NewSlot/NewSlot";
import { useState } from "react";

export default {
  component: DatePicker,
  title: "Components/Date Picker",
  parameters: { layout: "padded" },
} as Meta;

const props: DatePickerProps = {
  label: "בחר תאריך",
  onChange: () => {},
  value: new Date(2022, 1, 1, 10, 30, 0),
};

const Template: Story<DatePickerProps> = (args) => {
  const [date, setDate] = useState(args.value);
  return <DatePicker {...args} value={date} onChange={setDate} />;
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const MinDate = Template.bind({});
MinDate.args = {
  ...props,
  label: "תאריך עתידי בלבד",
  minimumDate: new Date(2022, 1, 4, 10, 30, 0),
};

export const DisableSaturday = Template.bind({});
DisableSaturday.args = {
  ...props,
  label: "ללא שבת",
  disableSaturday: true,
};
