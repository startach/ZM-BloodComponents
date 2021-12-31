import ScheduleWeekComponent, {
  ScheduleWeekComponentProps,
} from "./ScheduleWeekComponent";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ScheduleCell, ScheduleDay } from "../../../utils/types";
import _ from "lodash";

export default {
  component: ScheduleWeekComponent,
  title: "Components/Schedule/Week",
  parameters: { layout: "fullscreen" },
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

function getDay(orderFunction: (cell: ScheduleCell) => number): ScheduleDay {
  const cells = [
    getCell(0, 0),
    getCell(3, 1),
    getCell(3, 3),
    getCell(0, 0),
    getCell(2, 1),
    getCell(0, 0),
    getCell(3, 3),
    getCell(0, 0),
    getCell(3, 1),
  ];
  return {
    cells: _.sortBy(cells, orderFunction),
  };
}

const props: ScheduleWeekComponentProps = {
  week: {
    days: [
      getDay((cell) => cell.appointmentsCount),
      getDay((cell) => cell.cellStartTime.getTime()),
      getDay((cell) => cell.bookedAppointmentsCount),
      getDay((cell) => cell.appointmentsCount),
      getDay((cell) => -cell.bookedAppointmentsCount),
      getDay((cell) => cell.cellStartTime.getTime()),
    ],
  },
};

const Template: Story<ScheduleWeekComponentProps> = (args) => (
  <ScheduleWeekComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
