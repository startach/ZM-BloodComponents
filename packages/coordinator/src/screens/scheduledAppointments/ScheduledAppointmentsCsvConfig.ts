import { DateUtils, Hospital, LocaleUtils } from "@zm-blood-components/common";
import { BookedDonationWithDonorDetails } from "@zm-blood-components/common";
import { IColumn } from "react-csv-downloader/dist/esm/lib/csv";

enum columnNames {
  DATE = "date",
  HOUR = "hour",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  BLOOD_TYPE = "bloodType",
  PHONE = "phone",
}

export const csvColumns: IColumn[] = [
  { id: columnNames.DATE, displayName: "תאריך" },
  { id: columnNames.HOUR, displayName: "שעה" },
  { id: columnNames.FIRST_NAME, displayName: "שם פרטי" },
  { id: columnNames.LAST_NAME, displayName: "שם משפחה" },
  { id: columnNames.BLOOD_TYPE, displayName: "סוג דם" },
  { id: columnNames.PHONE, displayName: "טלפון" },
];

export const formatDataByColumns = (
  data: BookedDonationWithDonorDetails[]
): { [key: string]: string }[] => {
  return data.map((appointment) => {
    return {
      [columnNames.DATE]: DateUtils.ToDateString(
        new Date(appointment.donationStartTimeMillis)
      ),
      [columnNames.HOUR]: DateUtils.ToTimeString(
        new Date(appointment.donationStartTimeMillis)
      ),
      [columnNames.FIRST_NAME]: appointment.firstName,
      [columnNames.LAST_NAME]: appointment.lastName,
      [columnNames.BLOOD_TYPE]: LocaleUtils.getBloodTypeTranslation(
        appointment.bloodType
      ),
      [columnNames.PHONE]: appointment.phone.toString(),
    };
  });
};

export const getDonorReportFileName = (
  hospital: Hospital | "",
  fromDate: Date,
  toDate: Date
): string => {
  return `donations_${hospital}_${DateUtils.ToDateString(
    fromDate
  )}_to_${DateUtils.ToDateString(toDate)}`;
};
