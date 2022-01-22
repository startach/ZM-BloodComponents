import { getAppointmentCopyStringContent } from "./CopyAppointmentDetailsHelper";

const exampleName = "name";
const examplePhoneNumber = "000";
const exampleDonationTime = 946677600000;
const exampleDonationTimeFormat = "01/01/2000 00:00";

test("test copy string provider with time value", () => {
  const functionResult: string = getAppointmentCopyStringContent(
    exampleName,
    examplePhoneNumber,
    exampleDonationTime
  );

  expect(functionResult).toEqual(
    `${exampleName}, ${examplePhoneNumber}, ${exampleDonationTimeFormat}`
  );
});
