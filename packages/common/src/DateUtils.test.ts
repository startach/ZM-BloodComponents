import { DateComparer, ToDateString, ToTimeString } from "./DateUtils";

test("DateComparer works", () => {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  expect(DateComparer(now, yesterday)).toBeGreaterThan(0);
});

test("ToTimeString works", () => {
  const time = new Date(2021, 0, 13, 12, 35);
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
