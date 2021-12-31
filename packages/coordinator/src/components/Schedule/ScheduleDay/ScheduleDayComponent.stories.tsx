import ScheduleDayComponent, {
  ScheduleDayComponentProps,
} from "./ScheduleDayComponent";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ScheduleCell } from "../../../utils/types";

export default {
  component: ScheduleDayComponent,
  title: "Components/Schedule/Day",
  parameters: { layout: "padded" },
} as Meta;

function getCell(
  appointmentsCount: number,
  bookedAppointmentsCount: number
): ScheduleCell {
  return {
    cellStartTime: new Date(1640001600000),
    onClick: action("onClick"),
    appointmentsCount,
    bookedAppointmentsCount,
  };
}

const props: ScheduleDayComponentProps = {
  day: {
    cells: [
      getCell(0, 0),
      getCell(3, 1),
      getCell(3, 3),
      getCell(0, 0),
      getCell(2, 1),
      getCell(0, 0),
      getCell(3, 3),
      getCell(0, 0),
      getCell(3, 1),
    ],
  },
};

const Template: Story<ScheduleDayComponentProps> = (args) => (
  <div style={{ width: 60 }}>
    <ScheduleDayComponent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
