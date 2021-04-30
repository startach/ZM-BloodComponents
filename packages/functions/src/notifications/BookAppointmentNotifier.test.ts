import { mocked } from "ts-jest/utils";
import { addEmailToQueue } from "../dal/EmailNotificationsDataAccessLayer";
import { BloodType, DbDonor, Hospital } from "../../../common/src";
import {
  COORDINATOR_EMAILS,
  notifyOnAppointmentBooked,
} from "./BookAppointmentNotifier";

jest.mock("../dal/EmailNotificationsDataAccessLayer");
const mockedAddEmailToQueue = mocked(addEmailToQueue);

beforeEach(() => {
  mockedAddEmailToQueue.mockClear();
});

test("notify sends email to donor", async () => {
  const donor: DbDonor = {
    id: "donorId",
    firstName: "אריק",
    lastName: "איינשטיין",
    phone: "052-2223344",
    email: "arik@einstein.com",
    bloodType: BloodType.A_MINUS,
    birthDate: "03/01/1939",
    testUser: true,
  };

  await notifyOnAppointmentBooked(
    new Date(1619771400000),
    Hospital.BEILINSON,
    donor
  );

  expect(mockedAddEmailToQueue).toReturnTimes(2);

  expect(mockedAddEmailToQueue).toHaveBeenNthCalledWith(1, {
    to: ["arik@einstein.com"],
    message: {
      subject: "אישור קביעת תרומה - 11:30 30/04/2021",
      text:
        "שלום אריק," +
        "\n" +
        "זוהי הודעת אישור לתרומה שקבעת לתאריך 11:30 30/04/2021 בבית החולים בילינסון." +
        "\n" +
        "\n" +
        "בברכה," +
        "\n" +
        "צוות זכרון מנחם",
    },
  });

  expect(mockedAddEmailToQueue).toHaveBeenNthCalledWith(2, {
    to: COORDINATOR_EMAILS,
    message: {
      subject: "תרומה חדשה נקבעה לתאריך 11:30 30/04/2021",
      text:
        "שלום,\n" +
        "תרומה חדשה נקבעה לתאריך 11:30 30/04/2021 בבית החולים בילינסון.\n" +
        "שם התורם: אריק איינשטיין, טלפון: 052-2223344.\n" +
        "\n" +
        "בברכה,\n" +
        "צוות אפליקציית זכרון מנחם",
    },
  });
});
