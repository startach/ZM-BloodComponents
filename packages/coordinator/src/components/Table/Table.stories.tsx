import { Story } from "@storybook/react";
import { CardTableRow } from "./GroupTable";
import Table, { TableProps } from "./Table";
import { BloodType, Donor } from "@zm-blood-components/common";
import { searchDonorColumns } from "../../screens/searchDonorsScreen/SearchDonorsScreen";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Table,
  title: "Components Row Table",
};

const rows: CardTableRow<Donor>[] = [
  {
    rowData: {
      lastName: "Zcv",
      birthDate: "",
      id: "DOH51a9KJ2VJBpZsSaFe72dHygr2",
      bloodType: BloodType.O_PLUS,
      firstName: "Cxv",
      phone: "0532251426",
      email: "sfg@ghxf.com",
    },
  },
  {
    rowData: {
      email: "tt@test.com",
      firstName: "Lebron",
      id: "exjX1IXpB5e1oBIV1Dcmgj9f2nw1",
      bloodType: BloodType.NOT_SURE,
      birthDate: "",
      lastName: "James",
      phone: "0524498853",
    },
  },
  {
    rowData: {
      email: "nissest22@gmail.com",
      lastName: "8",
      bloodType: BloodType.B_MINUS,
      birthDate: "",
      phone: "0544116673",
      firstName: "Nir",
      id: "QoJEdyCYPJSDM4UyMn2W8qOw15j2",
    },
  },
  {
    rowData: {
      lastName: "sssd",
      email: "aa@a.com",
      birthDate: "",
      phone: "0543334442",
      id: "C1OHjLa4h5MMImCLiMei2stQkaA3",
      bloodType: BloodType.AB_MINUS,
      firstName: "aaa",
    },
  },
  {
    rowData: {
      phone: "0528444444",
      lastName: "hos1",
      firstName: "cor1",
      bloodType: BloodType.A_MINUS,
      id: "XkqyI9ETwicD4TzX2qnFF9rBXHP2",
      email: "nirztest8@gmail.com",
      birthDate: "",
    },
  },
  {
    rowData: {
      lastName: "zm_test",
      email: "cor_zm_test@a.com",
      id: "AIKuXNaZqITgyFppQdZGCqrgW7d2",
      birthDate: "",
      firstName: "cor_test",
      phone: "0542261158",
      bloodType: BloodType.A_PLUS,
    },
  },
  {
    rowData: {
      birthDate: "",
      bloodType: BloodType.O_PLUS,
      phone: "0528411999",
      lastName: "hos1",
      id: "yMwq3NQBtlaoy2LAerdgBESubM13",
      email: "nirst14@gmail.com",
      firstName: "donor1",
    },
  },
  {
    rowData: {
      id: "8doOcKEAvsbNV5RMnzU0Tew9ETo2",
      bloodType: BloodType.A_PLUS,
      firstName: "qwer",
      phone: "053113432",
      lastName: "ty",
      email: "qwer@gmail.com",
      birthDate: "",
    },
  },
  {
    rowData: {
      email: "miu@gmail.com",
      birthDate: "",
      id: "2AL2kLgUSFhhydNdm0L64N9TEC12",
      lastName: "ka",
      phone: "0501234567",
      firstName: "ra",
      bloodType: BloodType.O_PLUS,
    },
  },
  {
    rowData: {
      email: "tr@test.com",
      birthDate: "",
      firstName: "tr tester",
      id: "nS8qDFTA2PaIvZKdVzo51UATtt82",
      bloodType: BloodType.A_MINUS,
      lastName: "333",
      phone: "21112234",
    },
  },
  {
    rowData: {
      bloodType: BloodType.A_PLUS,
      phone: "052238307",
      email: "yerek@gmail.com",
      birthDate: "",
      lastName: "kazabubu",
      firstName: "shliflaf",
      id: "lRRqTlFiMnfFNxlsBtNIWs1NXwO2",
    },
  },
  {
    rowData: {
      bloodType: BloodType.NOT_SURE,
      lastName: "ו",
      phone: "0540000000",
      id: "Vx24MkpiF3ZU4um93rbx2KLHTJr2",
      email: "wags@dmail.com",
      firstName: "טל",
      birthDate: "",
    },
  },
  {
    rowData: {
      birthDate: "",
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
      bloodType: BloodType.B_MINUS,
      birthDate: "2020-11-13",
      id: "ZWeoYpX0XsaU0OyOIoINWK4Fcdi2",
      firstName: "ירון",
      lastName: "מלין",
      email: "a@a.com",
      phone: "0522322312",
    },
  },
  {
    rowData: {
      phone: "0522222222",
      id: "QVjvYphIB9Qnigg9crjvuwY7GJ43",
      bloodType: BloodType.O_PLUS,
      lastName: "מתלונן",
      email: "y@yaron.com",
      firstName: "יגל",
      birthDate: "",
    },
  },
  {
    rowData: {
      lastName: "קובל",
      phone: "0522215049",
      birthDate: "",
      bloodType: BloodType.O_PLUS,
      firstName: "יעלוז",
      email: "yarok@wazr.com",
      id: "8qhLCRwD7neqYUG7lHjysUM2D9f1",
    },
  },
  {
    rowData: {
      bloodType: BloodType.B_PLUS,
      firstName: "נוקדים",
      id: "nk0F1L0N4dQQlxb3nA6mHn9FZWN2",
      birthDate: "1999-12-10",
      lastName: "פרוזן",
      email: "rekjavik@gmail.com",
      phone: "050222222",
    },
  },
  {
    rowData: {
      email: "test@fff.com",
      lastName: "aaa",
      birthDate: "",
      firstName: "ניר",
      phone: "0522226654",
      id: "lu4EV7gQyEe06RnmjwTZuYuugPA2",
      bloodType: BloodType.A_MINUS,
    },
  },
  {
    rowData: {
      birthDate: "",
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
      phone: "0526404932",
      id: "TvmKdvXDnJdHkJ0dnzuz3FaN4zX2",
      email: "rokko@gmail.com",
      bloodType: BloodType.O_PLUS,
      firstName: "גם",
      lastName: "תכשיט",
      birthDate: "",
    },
  },
  {
    rowData: {
      id: "6oY3xoCbDdT0D9en3TFYiQITszq1",
      lastName: "עדי123",
      email: "a323@gmail.com",
      birthDate: "",
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

export const Template: Story<TableProps<Donor>> = (args: TableProps<Donor>) => (
  <Table {...args} />
);

export const Basic = Template.bind({});
Basic.args = baseArgs;

export const InitialSortByBloodType = Template.bind({});
InitialSortByBloodType.args = {
  ...baseArgs,
  initialSortByColumnIndex: 4,
};
