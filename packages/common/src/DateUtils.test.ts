import { DateComparer, ToDateString, ToTimeString } from "./DateUtils";

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
