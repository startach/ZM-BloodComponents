import { getAppointmentCopyString } from "./CopyAppointmentDetailsHelper";
import { Appointment } from "../../utils/types";

const exampleName = "name";
const examplePhoneNumber = "000";
const exampleDonationTime = 946677600000;
const exampleDonationTimeFormat = "01/01/2000 00:00";

let exmpleAppointment: Appointment = {
  appointmentId: "abcde",
  booked: true,
  isPastAppointment: false,
  donorName: exampleName,
  donationStartTimeMillis: exampleDonationTime,
  donorPhoneNumber: examplePhoneNumber,
};

test("test copy string provider with time value", () => {
  const functionResult: string = getAppointmentCopyString(exmpleAppointment);

  expect(functionResult).toEqual(
    `${exampleName}, ${examplePhoneNumber}, ${exampleDonationTimeFormat}`
  );
});

test.each([
  ["", "", undefined],
  ["", undefined, ""],
  [undefined, "", ""],
])(
  "test copy string provider with missing values",
  (donationStartTimeMillis, donorName, donorPhoneNumber) => {
    exmpleAppointment = {
      ...exmpleAppointment,
      donationStartTimeMillis: donationStartTimeMillis,
      donorName: donorName,
      donorPhoneNumber: donorPhoneNumber,
    };

    const functionResult: string = getAppointmentCopyString(exmpleAppointment);

    expect(functionResult).toEqual("");
  }
);
