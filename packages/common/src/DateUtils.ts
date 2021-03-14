// tslint:disable-next-line:no-import-side-effect
import "dayjs/locale/he";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

type ParsableDateValue = Date | string | number;

export const DateDisplayFormat = "DD/MM/YYYY";

export function ToDateString(
  date: ParsableDateValue | number,
  format?: string
) {
  return dayjs(date, format).format(DateDisplayFormat);
}

export function ToTimeString(
  date: ParsableDateValue | number,
  format?: string
) {
  return dayjs(date, format).format("HH:mm");
}

export function ToWeekDayString(
  date: ParsableDateValue | number,
  format?: string
) {
  //TODO: update the word "Day" based on the locale (in ar + en)
  return `יום ${dayjs(date, format).locale("he").format("dddd")}`;
}

export function DateComparer(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}
