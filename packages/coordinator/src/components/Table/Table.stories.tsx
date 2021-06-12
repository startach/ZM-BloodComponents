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
      phone: "0534251426",
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
      email: "nirztest22@gmail.com",
      lastName: "8",
      bloodType: BloodType.B_MINUS,
      birthDate: "",
      phone: "0544336673",
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
      phone: "0542266558",
      bloodType: BloodType.A_PLUS,
    },
  },
  {
    rowData: {
      birthDate: "",
      bloodType: BloodType.O_PLUS,
      phone: "0528499999",
      lastName: "hos1",
      id: "yMwq3NQBtlaoy2LAerdgBESubM13",
      email: "nirztest14@gmail.com",
      firstName: "donor1",
    },
  },
  {
    rowData: {
      id: "8doOcKEAvsbNV5RMnzU0Tew9ETo2",
      bloodType: BloodType.A_PLUS,
      firstName: "qwer",
      phone: "0534323432",
      lastName: "ty",
      email: "qwer@gmail.com",
      birthDate: "",
    },
  },
  {
    rowData: {
      email: "rakad@gmail.com",
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
      phone: "0525938307",
      email: "harelglik@gmail.com",
      birthDate: "",
      lastName: "גליקסמן",
      firstName: "הראל",
      id: "lRRqTlFiMnfFNxlsBtNIWs1NXwO2",
    },
  },
  {
    rowData: {
      bloodType: BloodType.NOT_SURE,
      lastName: "ו",
      phone: "0540000000",
      id: "Vx24MkpiF3ZU4um93rbx2KLHTJr2",
      email: "wagtal@dmail.com",
      firstName: "טל",
      birthDate: "",
    },
  },
  {
    rowData: {
      birthDate: "",
      email: "joav.di@gmail.com",
      phone: "0545934932",
      lastName: "דיאמנט",
      firstName: "יואב",
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
      lastName: "מלין",
      email: "yaron@yaron.com",
      firstName: "ירון",
      birthDate: "",
    },
  },
  {
    rowData: {
      lastName: "מלין",
      phone: "0525415049",
      birthDate: "",
      bloodType: BloodType.O_PLUS,
      firstName: "ירון",
      email: "yaron1m@gmail.com",
      id: "8qhLCRwD7neqYUG7lHjysUM2D9f1",
    },
  },
  {
    rowData: {
      bloodType: BloodType.B_PLUS,
      firstName: "מרואן",
      id: "nk0F1L0N4dQQlxb3nA6mHn9FZWN2",
      birthDate: "1991-11-10",
      lastName: "ריזק",
      email: "marwan.rizik@gmail.com",
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
      lastName: "ברהום",
      phone: "0525349798",
      id: "oTw5kyXpEmURXzmCA7qFADJB7v72",
      firstName: "עדי",
      email: "adibarhom@gmail.com",
    },
  },
  {
    rowData: {
      phone: "0526404932",
      id: "TvmKdvXDnJdHkJ0dnzuz3FaN4zX2",
      email: "adidush94@gmail.com",
      bloodType: BloodType.O_PLUS,
      firstName: "עדי",
      lastName: "קאופמן",
      birthDate: "",
    },
  },
  {
    rowData: {
      id: "6oY3xoCbDdT0D9en3TFYiQITszq1",
      lastName: "עדי123",
      email: "adi123@gmail.com",
      birthDate: "",
      phone: "0539483726",
      bloodType: BloodType.A_PLUS,
      firstName: "עדי",
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
