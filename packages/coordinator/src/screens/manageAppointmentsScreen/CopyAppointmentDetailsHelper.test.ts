import { getAppointmentCopyString } from "./CopyAppointmentDetailsHelper";
import { ManagedAppointment } from "./CoordinatorAppointmentsGrouper";

const exampleName = "name";
const examplePhoneNumber = "000";
const exampleDonationTime = 946677600000;
const exampleDonationTimeFormat = "01/01/2000 00:00";

const exmpleAppointment: ManagedAppointment = {
  appointmentId: "abcde",
  booked: true,
  isPastAppointment: false,
  donorName: exampleName,
  donationStartTimeMillis: exampleDonationTime,
  donorPhoneNumber: examplePhoneNumber,
};

test("test copy string provider", () => {
  const functionResult: string = getAppointmentCopyString(exmpleAppointment);

  expect(functionResult).toEqual(
    `${exampleName}, ${examplePhoneNumber}, ${exampleDonationTimeFormat}`
  );
});
