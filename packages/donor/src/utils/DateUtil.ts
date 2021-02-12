// tslint:disable-next-line:no-import-side-effect
import "dayjs/locale/he";
import dayjs from "dayjs";

export function ToDateString(date: Date) {
  return dayjs(date).format("D/M/YYYY");
}

export function ToTimeString(date: Date | string, format?: string) {
  return dayjs(date, format).format("HH:MM");
}
export function ToWeekDayString(date: Date | string, format?: string) {
  return dayjs(date, format).locale("he").format("dddd");
}
export function DateComparer(date1: Date, date2: Date): number {
  return date2.getTime() - date1.getTime();
}
