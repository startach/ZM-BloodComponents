import { RootState } from "../../store";
import { DateUtils } from "@zm-blood-components/common";
import { ScheduleCell, ScheduleDay } from "../../../utils/types";
import _ from "lodash";
import { getAppointmentsInTime } from "./GetAppointmentsSelector";
import { CoordinatorScreenKey } from "../../../navigation/CoordinatorScreenKey";

const millisInHour = 60 * 60 * 1_000;
const millisInWeek = 7 * 24 * millisInHour;

export const getSchedule =
  (state: RootState) =>
  (
    dayInRequestedWeek: Date | undefined,
    navigate: (route: string) => void
  ): ScheduleDay[] | undefined => {
    if (!dayInRequestedWeek) {
      return;
    }
    const startOfTheWeek = DateUtils.GetStartOfTheWeek(dayInRequestedWeek);
    const startTimeMillis = startOfTheWeek.getTime();
    const endTimeMillis = startOfTheWeek.getTime() + millisInWeek;

    const onClickCell = (cellStartTime: Date) => {
      navigate(`${CoordinatorScreenKey.DAY}/${cellStartTime.getTime()}`);
    };

    const appointments = getAppointmentsInTime(
      state,
      startTimeMillis,
      endTimeMillis
    );

    const cellsMap: { [hourStartTime: number]: ScheduleCell } = {};

    appointments.forEach((appointment) => {
      const hourStartTime = DateUtils.GetStartOfHour(
        appointment.donationStartTimeMillis
      );
      const cell: ScheduleCell =
        cellsMap[hourStartTime.getTime()] ||
        getEmptyCell(hourStartTime, onClickCell);

      cell.appointmentsCount++;
      if (appointment.booked) {
        cell.bookedAppointmentsCount++;
      }

      cellsMap[hourStartTime.getTime()] = cell;
    });

    const result = _.range(6).map<ScheduleDay>((dayIndex) => {
      const dayStartTime = new Date(startOfTheWeek);
      dayStartTime.setDate(dayStartTime.getDate() + dayIndex);

      const dayCells = _.range(24).map<ScheduleCell>((hour) => {
        const cellStartTime = dayStartTime.getTime() + hour * millisInHour;
        const existingCell = cellsMap[cellStartTime];
        if (existingCell) {
          return existingCell;
        }
        return getEmptyCell(new Date(cellStartTime), onClickCell);
      });

      return {
        dayStartTime,
        cells: dayCells,
      };
    });

    return result;
  };

function getEmptyCell(
  hourStartTime: Date,
  onClickCell: (cellStartTime: Date) => void
): ScheduleCell {
  return {
    cellStartTime: hourStartTime,
    bookedAppointmentsCount: 0,
    appointmentsCount: 0,
    onClick: onClickCell,
  };
}
