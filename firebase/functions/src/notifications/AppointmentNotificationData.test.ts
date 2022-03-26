import { DbAppointment, DbDonor } from "../function-types";
import * as admin from "firebase-admin";
import { AppointmentStatus, Hospital } from "@zm-blood-components/common";
import { sampleUser } from "../testUtils/TestSamples";
import { calculateNotificationData } from "./AppointmentNotificationData";

describe("Appointment Notification Data", function () {
  test("Get appointment notification data", () => {
    const donationStartTime = 1637224200000;
    const appointment: DbAppointment = {
      id: "appointmentId",
      creationTime: admin.firestore.Timestamp.fromMillis(donationStartTime),
      creatorUserId: "creator",
      donationStartTime:
        admin.firestore.Timestamp.fromMillis(donationStartTime),
      hospital: Hospital.BEILINSON,
      donorId: "donorId",
      status: AppointmentStatus.BOOKED,
    };

    const donor: DbDonor = {
      ...sampleUser,
      id: "donorId",
    };

    const res = calculateNotificationData(true, appointment, donor);

    expect(res.appointmentId).toEqual("appointmentId");
    expect(res.date).toEqual("18/11/2021");
    expect(res.time).toEqual("10:30");
    expect(res.hospital).toEqual("בילינסון");
    expect(res.donorId).toEqual("donorId");
    expect(res.donorEmail).toEqual(sampleUser.email);
    expect(res.donorName).toEqual(
      sampleUser.firstName + " " + sampleUser.lastName
    );
    expect(res.donorPhone).toEqual(sampleUser.phone);
    expect(res.donationStartTimeMillis).toEqual(donationStartTime);
    expect(res.unsubscribeLink).toEqual(
      "https://us-central1-blood-components-9ad48.cloudfunctions.net/unsubscribe?method=email&userId=donorId"
    );
    expect(res.donationApprovalLink).toEqual(
      "https://us-central1-blood-components-9ad48.cloudfunctions.net/completeAppointmentApiHandler?donorId=donorId&appointmentId=appointmentId&isNoshow=false"
    );
    expect(res.donationNoShowLink).toEqual(
      "https://us-central1-blood-components-9ad48.cloudfunctions.net/completeAppointmentApiHandler?donorId=donorId&appointmentId=appointmentId&isNoshow=true"
    );
  });
});
