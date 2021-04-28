export async function expectAsyncThrows(
  action: () => Promise<any>,
  expectedExceptionText: string
) {
  let error;
  try {
    await action();
  } catch (e) {
    error = e;
  }

  // @ts-ignore
  expect(error).toEqual(new Error(expectedExceptionText));
}

export function getDate(daysFromNow: number) {
  const res = new Date();
  res.setDate(res.getDate() + daysFromNow);
  return res;
}
