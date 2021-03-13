import { NewSlots } from "./AddAppointmentsScreenContainer";
import { DateUtils, LocaleUtils } from "@zm-blood-components/common";
import Button from "../../components/Button";
import { CardTableColumn, CardTableRow } from "../../components/CardTable";
import dayjs from "dayjs";

const donationTypeText = "סוג תרומה";
const hospitalText = "בית חולים";
const dateText = "תאריך";
const timeText = "שעה";
const slotsText = "כמות משבצות";

const PlateletsText = "טרומבוציטים";

export const columns = (
  deleteSlotsRequest: (key: string) => void
): CardTableColumn<NewSlots>[] => [
  {
    label: donationTypeText,
    cellRenderer: ({}) => PlateletsText,
  },
  {
    label: hospitalText,
    cellRenderer: ({ hospital }) => LocaleUtils.getHospitalName(hospital),
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      LocaleUtils.getHospitalName(a.hospital) <
      LocaleUtils.getHospitalName(b.hospital)
        ? -1
        : 1,
  },
  {
    label: dateText,
    cellRenderer: ({ donationStartTime }) =>
      DateUtils.ToDateString(donationStartTime),
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      dayjs(a.donationStartTime).diff(dayjs(b.donationStartTime)) < 0 ? -1 : 1,
  },
  {
    label: timeText,
    cellRenderer: ({ donationStartTime }) =>
      DateUtils.ToTimeString(donationStartTime),
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      dayjs(a.donationStartTime).diff(dayjs(b.donationStartTime)) < 0 ? -1 : 1,
  },
  {
    label: slotsText,
    cellRenderer: ({ slots }) => slots,
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      a.slots < b.slots ? -1 : 1,
  },
  {
    cellRenderer: ({ key }) => (
      <Button title="מחק" onClick={() => deleteSlotsRequest(key)} />
    ),
    colRelativeWidth: 0,
  },
];

export const rows = (slotsArray: NewSlots[]): CardTableRow<NewSlots>[] =>
  slotsArray.map((slot) => {
    return { rowSummary: slot };
  });
