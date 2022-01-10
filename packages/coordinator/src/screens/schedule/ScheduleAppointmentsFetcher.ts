import { DateUtils, Hospital } from "@zm-blood-components/common";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import { ScheduleCell, ScheduleDay } from "../../utils/types";
import _ from "lodash";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

const millisInHour = 60 * 60 * 1_000;
const millisInWeek = 7 * 24 * 60 * 60 * 1_000;
export async function fetchScheduleAppointments(
  hospital: Hospital,
  dayInRequestedWeek: Date,
  navigate: (route: string) => void
): Promise<ScheduleDay[]> {
  const startOfTheWeek = DateUtils.GetStartOfTheWeek(dayInRequestedWeek);

  const appointmentsResponse = await CoordinatorFunctions.getAppointments(
    hospital,
    startOfTheWeek.getTime(),
    startOfTheWeek.getTime() + millisInWeek - 1
  );

  const onClickCell = (cellStartTime: Date) => {
    navigate(
      `${CoordinatorScreenKey.DAY}/${hospital}/${cellStartTime.getTime()}`
    );
  };

  const cellsMap: { [hourStartTime: number]: ScheduleCell } = {};

  appointmentsResponse.appointments.forEach((appointment) => {
    const hourStartTime = DateUtils.GetStartOfHour(
      appointment.donationStartTimeMillis
    );
    const cell: ScheduleCell =
      cellsMap[hourStartTime.getTime()] ||
      getEmptyCell(hourStartTime, onClickCell);

    cell.appointmentsCount++;
    if (appointment.donorId) {
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
}

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
