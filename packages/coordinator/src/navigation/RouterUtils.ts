import { Hospital } from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "./CoordinatorScreenKey";

export function schedulePath(hospital: Hospital, dayInWeek: Date = new Date()) {
  return (
    CoordinatorScreenKey.SCHEDULE + "/" + hospital + "/" + dayInWeek.getTime()
  );
}

export function getTimestamp(timestamp: string | undefined) {
  if (!timestamp || isNaN(parseInt(timestamp))) {
    return undefined;
  }

  return new Date(parseInt(timestamp));
}
