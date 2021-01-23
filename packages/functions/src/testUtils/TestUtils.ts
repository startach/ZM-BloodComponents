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

  expect(error).toEqual(new Error(expectedExceptionText));
}
