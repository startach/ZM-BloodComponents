import { CoordinatorScreenKey } from "./CoordinatorScreenKey";

export function schedulePath(dayInWeek: Date = new Date()) {
  return CoordinatorScreenKey.SCHEDULE + "/" + dayInWeek.getTime();
}

export function getTimestamp(timestamp: string | undefined) {
  if (!timestamp || isNaN(parseInt(timestamp))) {
    return undefined;
  }

  return new Date(parseInt(timestamp));
}
