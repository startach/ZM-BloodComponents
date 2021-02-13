import { DateComparer } from "./DateUtil";

test("DateComparer works", () => {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  expect(DateComparer(now, yesterday)).toBeGreaterThan(0);
});
