// tslint:disable-next-line:no-import-side-effect
import "dayjs/locale/he";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export type ParsableDateValue = Date | string | number;

export const DateDisplayFormat = "D/M/YYYY";

export function ToDateString(date: ParsableDateValue, format?: string) {
  return dayjs(date, format).format(DateDisplayFormat);
}

export function ToTimeString(date: ParsableDateValue, format?: string) {
  return dayjs(date, format).format("HH:MM");
}

export function ToWeekDayString(date: ParsableDateValue, format?: string) {
  return dayjs(date, format).locale("he").format("dddd");
}

export function DateComparer(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}
