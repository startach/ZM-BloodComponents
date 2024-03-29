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

const weekStartMillis = 1641074400000; // January 2, 2022 0:00:00 GMT+02:00
const millisInHour = 60 * 60 * 1000;
const daysOffset = _.range(6);
const onClick = action("onClickCell");
const days = daysOffset.map<ScheduleDay>((dayOffset) => {
  const dayStartMillis = weekStartMillis + dayOffset * 24 * millisInHour;
  const cells: ScheduleCell[] = [];
  for (let i = 0; i < 24; i++) {
    const cellStartMillis = dayStartMillis + i * millisInHour;
    const appointmentsCount = (dayOffset + i) % 3 === 0 ? 3 : 0;
    const bookedAppointmentsCount = (dayOffset * 3 + i) % 4;

    cells.push({
      cellStartTime: new Date(cellStartMillis),
      onClick,
      appointmentsCount,
      bookedAppointmentsCount,
    });
  }

  return {
    dayStartTime: new Date(dayStartMillis),
    cells,
  };
});

const props: ScheduleWeekComponentProps = {
  days,
};

const Template: Story<ScheduleWeekComponentProps> = (args) => (
  <ScheduleWeekComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...props,
};
