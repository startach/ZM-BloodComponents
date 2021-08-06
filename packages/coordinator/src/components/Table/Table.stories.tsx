import { Story } from "@storybook/react";
import { CardTableRow } from "./GroupTable";
import Table, { TableProps } from "./Table";
import {
  BloodType,
  Donor,
  DonorNotificationSettings,
} from "@zm-blood-components/common";
import { searchDonorColumns } from "../../screens/searchDonorsScreen/SearchDonorsScreen";

export default {
  component: Table,
  title: "Components Row Table",
};

const baseUser = {
  birthDate: "",
  notificationSettings: {
    disableEmailNotifications: false,
  },
};

const rows: CardTableRow<Donor>[] = [
  {
    rowData: {
      ...baseUser,
      lastName: "Zcv",
      id: "DOH51a9KJ2VJBpZsSaFe72dHygr2",
      bloodType: BloodType.O_PLUS,
      firstName: "Cxv",
      phone: "0532251426",
      email: "sfg@ghxf.com",
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "tt@test.com",
      firstName: "Lebron",
      id: "exjX1IXpB5e1oBIV1Dcmgj9f2nw1",
      bloodType: BloodType.NOT_SURE,
      lastName: "James",
      phone: "0524498853",
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "nis2est22@gmail.com",
      lastName: "8",
      bloodType: BloodType.B_MINUS,
      phone: "0544116673",
      firstName: "Nir",
      id: "QoJEdyCYPJSDM4UyMn2W8qOw15j2",
    },
  },
  {
    rowData: {
      ...baseUser,
      lastName: "sssd",
      email: "aa@a.com",
      phone: "0543334442",
      id: "C1OHjLa4h5MMImCLiMei2stQkaA3",
      bloodType: BloodType.AB_MINUS,
      firstName: "aaa",
    },
  },
  {
    rowData: {
      ...baseUser,
      phone: "0528444444",
      lastName: "hos1",
      firstName: "cor1",
      bloodType: BloodType.A_MINUS,
      id: "XkqyI9ETwicD4TzX2qnFF9rBXHP2",
      email: "ni2test8@gmail.com",
    },
  },
  {
    rowData: {
      ...baseUser,
      lastName: "zm_test",
      email: "cor_zm_test@a.com",
      id: "AIKuXNaZqITgyFppQdZGCqrgW7d2",
      firstName: "cor_test",
      phone: "0542261158",
      bloodType: BloodType.A_PLUS,
    },
  },
  {
    rowData: {
      ...baseUser,
      bloodType: BloodType.O_PLUS,
      phone: "0528411999",
      lastName: "hos1",
      id: "yMwq3NQBtlaoy2LAerdgBESubM13",
      email: "ni2st14@gmail.com",
      firstName: "donor1",
    },
  },
  {
    rowData: {
      ...baseUser,
      id: "8doOcKEAvsbNV5RMnzU0Tew9ETo2",
      bloodType: BloodType.A_PLUS,
      firstName: "qwer",
      phone: "053113432",
      lastName: "ty",
      email: "qwer@gmail.com",
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "miu@gmail.com",
      id: "2AL2kLgUSFhhydNdm0L64N9TEC12",
      lastName: "ka",
      phone: "0501234567",
      firstName: "ra",
      bloodType: BloodType.O_PLUS,
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "tr@test.com",
      firstName: "tr tester",
      id: "nS8qDFTA2PaIvZKdVzo51UATtt82",
      bloodType: BloodType.A_MINUS,
      lastName: "333",
      phone: "21112234",
    },
  },
  {
    rowData: {
      ...baseUser,
      bloodType: BloodType.A_PLUS,
      phone: "052238307",
      email: "yerek@gmail.com",
      lastName: "kazabubu",
      firstName: "shliflaf",
      id: "lRRqTlFiMnfFNxlsBtNIWs1NXwO2",
    },
  },
  {
    rowData: {
      ...baseUser,
      bloodType: BloodType.NOT_SURE,
      lastName: "ו",
      phone: "0540000000",
      id: "Vx24MkpiF3ZU4um93rbx2KLHTJr2",
      email: "wags@dmail.com",
      firstName: "טל",
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "dimonder@gmail.com",
      phone: "0522222932",
      lastName: "קדימה",
      firstName: "מואב",
      bloodType: BloodType.AB_PLUS,
      id: "hWmpOj8ob6NY2Ju3e8nQr7NrrIw2",
    },
  },
  {
    rowData: {
      ...baseUser,
      phone: "0522222222",
      id: "QVjvYphIB9Qnigg9crjvuwY7GJ43",
      bloodType: BloodType.O_PLUS,
      lastName: "מתלונן",
      email: "y@yaron.com",
      firstName: "יגל",
    },
  },
  {
    rowData: {
      ...baseUser,
      lastName: "קובל",
      phone: "0522215049",
      bloodType: BloodType.O_PLUS,
      firstName: "יעלוז",
      email: "yarok@wazr.com",
      id: "8qhLCRwD7neqYUG7lHjysUM2D9f1",
    },
  },
  {
    rowData: {
      ...baseUser,
      bloodType: BloodType.B_PLUS,
      firstName: "נוקדים",
      id: "nk0F1L0N4dQQlxb3nA6mHn9FZWN2",
      lastName: "פרוזן",
      email: "rekjavik@gmail.com",
      phone: "050222222",
    },
  },
  {
    rowData: {
      ...baseUser,
      email: "test@fff.com",
      lastName: "aaa",
      firstName: "ניר",
      phone: "0522226654",
      id: "lu4EV7gQyEe06RnmjwTZuYuugPA2",
      bloodType: BloodType.A_MINUS,
    },
  },
  {
    rowData: {
      ...baseUser,
      bloodType: BloodType.A_PLUS,
      lastName: "מרעום",
      phone: "0525349798",
      id: "oTw5kyXpEmURXzmCA7qFADJB7v72",
      firstName: "תכשיט",
      email: "norad@gmail.com",
    },
  },
  {
    rowData: {
      ...baseUser,
      phone: "0526402232",
      id: "TvmKdvXDnJdHkJ0dnzuz3FaN4zX2",
      email: "rokko@gmail.com",
      bloodType: BloodType.O_PLUS,
      firstName: "גם",
      lastName: "תכשיט",
    },
  },
  {
    rowData: {
      ...baseUser,
      id: "6oY3xoCbDdT0D9en3TFYiQITszq1",
      lastName: "עדי123",
      email: "a323@gmail.com",
      phone: "0539222226",
      bloodType: BloodType.A_PLUS,
      firstName: "עשי",
    },
  },
];
const baseArgs: TableProps<Donor> = {
  rows: rows,
  columns: searchDonorColumns,
  hasColumnHeaders: true,
};

const Template: Story<TableProps<Donor>> = (args: TableProps<Donor>) => (
  <Table {...args} />
);

export const Basic = Template.bind({});
Basic.args = baseArgs;

export const InitialSortByBloodType = Template.bind({});
InitialSortByBloodType.args = {
  ...baseArgs,
  initialSortByColumnIndex: 4,
};
