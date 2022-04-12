import {
  DateComparer,
  GetStartOfDay,
  GetStartOfHour,
  GetStartOfTheWeek,
  isSameDay,
  ToDateString,
  ToMonthString,
  ToTimeString,
  ToWeekDayLetter,
  getNumberOfDaysBetweenDates,
} from "./DateUtils";

describe("DateUtils", function () {
  test("DateComparer works", () => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(DateComparer(now, yesterday)).toBeGreaterThan(0);
  });

  test("ToTimeString works", () => {
    const time = new Date(1610534100000); // Wednesday, January 13, 2021 12:35:00 GMT+02:00
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(ToTimeString(time)).toEqual("12:35");
  });

  test("ToDateString works", () => {
    const time = new Date(2021, 0, 13, 12, 35);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(ToDateString(time)).toEqual("13/01/2021");
  });

  test("ToWeekDayLatter works", () => {
    const Sunday = new Date(2022, 0, 2);
    expect(ToWeekDayLetter(Sunday)).toEqual("א");

    const Friday = new Date(2022, 0, 7);
    expect(ToWeekDayLetter(Friday)).toEqual("ו");
  });

  test("ToMonthString works", () => {
    expect(ToMonthString(new Date(2022, 0, 2))).toEqual("ינואר");
    expect(ToMonthString(new Date(2022, 11, 2), true)).toEqual("דצמ'");
  });

  test.each([true, false])("isSameDay works - %s", (areTgeSameDay) => {
    const date1 = new Date(2022, 0, 2, 11, 30);
    const date2 = areTgeSameDay
      ? new Date(2022, 0, 2, 17, 30)
      : new Date(2022, 0, 3, 17, 30);
    expect(isSameDay(date1, date2)).toEqual(areTgeSameDay);
  });

  test("GetStartOfDay works", () => {
    expect(GetStartOfDay(new Date(2022, 0, 2, 11, 30))).toEqual(
      new Date(2022, 0, 2)
    );
  });

  test("GetStartOfHour works", () => {
    expect(GetStartOfHour(new Date(2022, 0, 2, 11, 30))).toEqual(
      new Date(2022, 0, 2, 11, 0)
    );
  });

  test("getNumberOfDaysBetweenDates works", () => {
    const DAYS_DIFFERENCE = 10;
    const now = new Date();
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - DAYS_DIFFERENCE);

    expect(getNumberOfDaysBetweenDates(now, yesterday)).toEqual(
      DAYS_DIFFERENCE
    );
    expect(getNumberOfDaysBetweenDates(yesterday, now)).toEqual(
      DAYS_DIFFERENCE
    );
  });
});
