// tslint:disable-next-line:no-import-side-effect
import "dayjs/locale/he";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
const IL_TIMEZONE = "Asia/Jerusalem";
dayjs.tz.setDefault(IL_TIMEZONE);

type ParsableDateValue = Date | string | number;

export const DateDisplayFormat = "DD/MM/YYYY";

export function ToDateString(
  date: ParsableDateValue | number,
  format?: string
) {
  return dayjs(date, format).tz().format(DateDisplayFormat);
}

export function ToTimeString(date: ParsableDateValue | number) {
  return dayjs(date).tz(IL_TIMEZONE).format("HH:mm");
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

export function DateToMidnight(date: Date) {
  const midnight = date;
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export function TodayAdMidnight() {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export const ShortDateFormat: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
