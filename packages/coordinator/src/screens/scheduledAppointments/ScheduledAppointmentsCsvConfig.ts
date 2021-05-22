import { DateUtils, LocaleUtils } from "@zm-blood-components/common";
import {
  BloodType,
  BookedDonationWithDonorDetails,
} from "@zm-blood-components/common";
import { IColumn } from "react-csv-downloader/dist/esm/lib/csv";

enum columnNames {
  DATE = "date",
  HOUR = "hour",
  HOSPITAL = "hospital",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  BLOOD_TYPE = "bloodType",
  PHONE = "phone",
}

export const csvColumns: IColumn[] = [
  { id: columnNames.DATE, displayName: "תאריך" },
  { id: columnNames.HOUR, displayName: "שעה" },
  { id: columnNames.HOSPITAL, displayName: 'בי"ח' },
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
      [columnNames.HOSPITAL]: LocaleUtils.getHospitalName(appointment.hospital),
      [columnNames.FIRST_NAME]: appointment.firstName,
      [columnNames.LAST_NAME]: appointment.lastName,
      [columnNames.BLOOD_TYPE]:
        appointment.bloodType === BloodType.NOT_SURE
          ? "לא יודע/ת"
          : appointment.bloodType,
      [columnNames.PHONE]: appointment.phone.toString(),
    };
  });
};
