import { NewSlots } from "./AddAppointmentsScreenContainer";
import { DateUtils, LocaleUtils } from "@zm-blood-components/common";
import { CardTableColumn, CardTableRow } from "../../components/V2/Table";
import { IconButton } from "../../components/V2/IconButton";
import trashIcon from "../../assets/trash.svg";

const donationTypeText = "סוג תרומה";
const hospitalText = "בית חולים";
const dateText = "תאריך";
const timeText = "שעה";
const slotsText = "עמדות";

const PlateletsText = "טרומבוציטים";

export const columns = (
  deleteSlotsRequest: (key: string) => void
): CardTableColumn<NewSlots>[] => [
  {
    label: donationTypeText,
    cellRenderer: () => PlateletsText,
  },
  {
    label: hospitalText,
    cellRenderer: ({ hospital }) => LocaleUtils.getHospitalName(hospital),
    sortBy: (a, b) =>
      LocaleUtils.getHospitalName(a.hospital) <
      LocaleUtils.getHospitalName(b.hospital)
        ? -1
        : 1,
  },
  {
    label: dateText,
    cellRenderer: ({ donationStartTime }) =>
      DateUtils.ToDateString(donationStartTime),
    sortBy: (a, b) =>
      DateUtils.DateComparer(a.donationStartTime, b.donationStartTime),
  },
  {
    label: timeText,
    cellRenderer: ({ donationStartTime }) =>
      DateUtils.ToTimeString(donationStartTime),
  },
  {
    label: slotsText,
    cellRenderer: ({ slots }) => slots,
    sortBy: (a, b) => (a.slots < b.slots ? -1 : 1),
  },
  {
    cellRenderer: ({ key }) => (
      <IconButton
        aria-label="delete"
        iconUrl={trashIcon}
        color={"default"}
        onClick={() => deleteSlotsRequest(key)}
      />
    ),
    colRelativeWidth: 0,
  },
];

export const rows = (slotsArray: NewSlots[]): CardTableRow<NewSlots>[] =>
  slotsArray.map((slot) => {
    return { rowData: slot };
  });
