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

export function ToShortDateString(
  date: ParsableDateValue | number,
  format?: string
) {
  return dayjs(date, format).tz().format("DD/MM");
}

export function ToTimeString(date: ParsableDateValue | number) {
  return dayjs(date).tz(IL_TIMEZONE).format("HH:mm");
}

export function ToWeekDayString(
  date: ParsableDateValue | number,
  format?: string
) {
  return `יום ${dayjs(date, format).locale("he").format("dddd")}`;
}

export function ToMonthString(
  date: ParsableDateValue | number,
  short?: boolean
) {
  const format = short ? "MMM" : "MMMM";
  let res = dayjs(date).locale("he").format(format);
  if (short) {
    res += "'";
  }
  return res;
}

export function ToWeekDayLetter(date: ParsableDateValue | number) {
  return dayjs(date).locale("he").format("dd").substring(0, 1);
}

export function DateComparer(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function DateToMidnight(date: Date) {
  const midnight = date;
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export function isSameDay(date1: Date, date2: Date) {
  return DateToMidnight(date1).getTime() === DateToMidnight(date2).getTime();
}

export function TodayAdMidnight() {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}

export function GetStartOfDay(date: Date | number) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function GetStartOfHour(date: Date | number) {
  const d = new Date(date);
  d.setMinutes(0, 0, 0);
  return d;
}

export function GetStartOfTheWeek(date: Date | number) {
  const time = GetStartOfDay(date);
  time.setDate(time.getDate() - time.getDay());
  return time;
}

export function DateWithAddedMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export const ShortDateFormat: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const LongDateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
