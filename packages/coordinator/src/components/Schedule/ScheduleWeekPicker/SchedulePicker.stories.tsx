import SchedulePicker, { SchedulePickerProps } from "./SchedulePicker";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Hospital } from "@zm-blood-components/common";
import { useState } from "react";

export default {
  component: SchedulePicker,
  title: "Components/Schedule/Picker",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: SchedulePickerProps = {
  weekStartTime: new Date(2022, 0, 16, 0, 0, 0),
  hospital: Hospital.HADASA_EIN_KEREM,
  availableHospitals: [
    Hospital.HADASA_EIN_KEREM,
    Hospital.SOROKA,
    Hospital.TEL_HASHOMER,
  ],
  setSelectedHospital: action("setSelectedHospital"),
  onNext: action("onNext"),
  onPrevious: action("onPrevious"),
};

const Template: Story<SchedulePickerProps> = (args) => {
  const [hospital, setHospital] = useState(Hospital.HADASA_EIN_KEREM);
  return (
    <SchedulePicker
      {...args}
      hospital={hospital}
      setSelectedHospital={setHospital}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const DifferentMonths = Template.bind({});
DifferentMonths.args = {
  ...props,
  weekStartTime: new Date(2022, 0, 30, 0, 0, 0),
};

export const DifferentYear = Template.bind({});
DifferentYear.args = {
  ...props,
  weekStartTime: new Date(2021, 0, 5, 0, 0, 0),
};

export const OnlyOneHospital = Template.bind({});
OnlyOneHospital.args = {
  ...props,
  hospital: Hospital.SOROKA,
  availableHospitals: [Hospital.SOROKA],
};
