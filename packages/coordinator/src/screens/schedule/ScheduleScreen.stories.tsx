import ScheduleScreen, { ScheduleScreenProps } from "./ScheduleScreen";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { ScheduleCell, ScheduleDay } from "../../utils/types";
import { Hospital } from "@zm-blood-components/common";
import { Story } from "@storybook/react";
import { useState } from "react";

export default {
  component: ScheduleScreen,
  title: "Screens/Schedule Screen",
  parameters: { layout: "fullscreen" },
};

const weekStartMillis = 1642284000000; // January 16, 2022 0:00:00 GMT+02:00
const millisInHour = 60 * 60 * 1000;
const daysOffset = _.range(6);
const onClick = action("onClickCell");
const days = daysOffset.map<ScheduleDay>((dayOffset) => {
  const dayStartMillis = weekStartMillis + dayOffset * 24 * millisInHour;
  const cells: ScheduleCell[] = [];
  for (let i = 0; i < 24; i++) {
    const cellStartMillis = dayStartMillis + i * millisInHour;
    const appointmentsCount = (dayOffset + i) % 3 == 0 ? 3 : 0;
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

const props: ScheduleScreenProps = {
  dayInWeek: new Date(weekStartMillis),
  days,
  hospital: Hospital.HADASA_EIN_KEREM,
  setHospital: () => {},
  onNextWeek: action("onNextWeek"),
  oPreviousWeek: action("oPreviousWeek"),
  availableHospitals: [
    Hospital.HADASA_EIN_KEREM,
    Hospital.SOROKA,
    Hospital.TEL_HASHOMER,
  ],
};

const Template: Story<ScheduleScreenProps> = (args) => {
  const [hospital, setHospital] = useState(Hospital.HADASA_EIN_KEREM);
  return (
    <ScheduleScreen {...args} hospital={hospital} setHospital={setHospital} />
  );
};
export const Default = Template.bind({});
Default.args = props;

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  days: [],
};
