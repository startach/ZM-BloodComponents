import ScheduleScreen, { ScheduleScreenProps } from "./ScheduleScreen";
import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { ScheduleCell, ScheduleDay } from "../../utils/types";
import { ScheduleWeekComponentProps } from "../../components/Schedule/ScheduleWeek/ScheduleWeekComponent";
import { Hospital } from "@zm-blood-components/common";

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
    cells,
  };
});

const props: ScheduleScreenProps = {
  days,
  onNextWeek: action("onNextWeek"),
  oPreviousWeek: action("oPreviousWeek"),
  onAddAppointment: action("onAddAppointment"),
  availableHospitals: [
    Hospital.HADASA_EIN_KEREM,
    Hospital.SOROKA,
    Hospital.TEL_HASHOMER,
  ],
};

export const Default = (args: ScheduleScreenProps) => (
  <ScheduleScreen {...args} />
);
Default.args = props;
