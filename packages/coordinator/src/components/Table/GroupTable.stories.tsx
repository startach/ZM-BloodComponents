/* eslint-disable import/no-anonymous-default-export */
import { Story } from "@storybook/react";
import GroupsTable, {
  CardTableRow,
  CardTableRowGroup,
  GroupTableProps,
} from "./GroupTable";
import {
  AppointmentSlot,
  DonationDay,
} from "../../screens/manageAppointmentsScreen/CoordinatorAppointmentsGrouper";
import { BloodType } from "@zm-blood-components/common";
import {
  AppointmentTableExpandedRowContent,
  MainAppointmentTableColumns,
} from "../../screens/manageAppointmentsScreen/ManageAppointmentsTableConfig";

const donationDays: DonationDay[] = [
  {
    day: "06/08/2021",
    appointmentSlots: [
      {
        donationStartTimeMillis: 1640421300000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "שקשוקה מיילס",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0542266558",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
      {
        donationStartTimeMillis: 1640424900000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "זמביה שלונצק",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0542266558",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
      {
        donationStartTimeMillis: 1640426700000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "מקנה צאן וארח",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "50502",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
    ],
  },
  {
    day: "06/12/2021",
    appointmentSlots: [
      {
        donationStartTimeMillis: 1640421300000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "איתן ויקטור ויקטור",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0543336558",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
      {
        donationStartTimeMillis: 1640421900000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "wannacry",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0541111158",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
      {
        donationStartTimeMillis: 1640424900000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "זומבי זומבה",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0500200558",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
    ],
  },
  {
    day: "24/12/2021",
    appointmentSlots: [
      {
        donationStartTimeMillis: 1640421300000,
        appointments: [
          {
            appointmentId: "77Mv6BCWymSsHO6VC1o3",
            booked: true,
            donorName: "בוקי פרחים",
            donorPhoneNumber: "0501234567",
            bookingTimeMillis: 1621676658300,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.NOT_SURE,
          },
          {
            appointmentId: "RS3tCCdLROoPwWiiIPlq",
            booked: true,
            donorName: "cor_test zm_test",
            donorPhoneNumber: "0542116558",
            bookingTimeMillis: 1621686802367,
            recentChangeType: undefined,
            isPastAppointment: false,
            bloodType: BloodType.AB_PLUS,
          },
          {
            appointmentId: "Xc2EgaWcCqoIOSoHzPVQ",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "aTKs6QHKOxMVueclSCI9",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "mALIMke0xmqMjGs6bi0n",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
          {
            appointmentId: "yC0Z35Fr6MO6BNC0VYTN",
            booked: false,
            bookingTimeMillis: undefined,
            recentChangeType: undefined,
            isPastAppointment: false,
          },
        ],
      },
    ],
  },
];

const groupDonationDays = (
  donationDays: DonationDay[]
): CardTableRowGroup<AppointmentSlot>[] => {
  return donationDays.map<CardTableRowGroup<AppointmentSlot>>((day) => ({
    groupLabel: day.day,
    rowsInGroup: day.appointmentSlots.map<CardTableRow<AppointmentSlot>>(
      (slot) => ({
        rowData: slot,
        expandRow: (slot) =>
          AppointmentTableExpandedRowContent(
            slot,
            () => {},
            async () => {},
            async () => {},
            false,
            async () => {}
          ),
      })
    ),
  }));
};

export default {
  component: GroupsTable,
  title: "Components Group Table",
};

const baseArgs: GroupTableProps<AppointmentSlot> = {
  groups: groupDonationDays(donationDays),
  columns: MainAppointmentTableColumns(false),
  hasColumnHeaders: true,
};

const Template: Story<GroupTableProps<AppointmentSlot>> = (
  args: GroupTableProps<AppointmentSlot>
) => <GroupsTable {...args} />;

export const Basic = Template.bind({});
Basic.args = baseArgs;
