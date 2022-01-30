import { Meta, Story } from "@storybook/react";
import {
  AppointmentStatus,
  BloodType,
  Hospital,
} from "@zm-blood-components/common";
import ReportsScreen, { ReportsScreenProps } from "./ReportsScreen";
import { action } from "@storybook/addon-actions";

export default {
  component: ReportsScreen,
  title: "Screens/Reports Screen",
  parameters: { layout: "fullscreen" },
} as Meta;

const props: ReportsScreenProps = {
  activeHospitalsForCoordinator: [Hospital.ASAF_HAROFE, Hospital.TEL_HASHOMER],
  onSearch: action("onSearch"),
  appointmentsWithDonorDetails: [
    {
      status: AppointmentStatus.BOOKED,
      phone: "0525256631",
      lastName: "כהן",
      firstName: "אברהם",
      donorId: "donorId1",
      donationStartTimeMillis: 1641988800000,
      hospital: Hospital.ASAF_HAROFE,
      appointmentId: "appointmentId1",
      bookingTimeMillis: 1641988800000,
      bloodType: BloodType.A_PLUS,
    },
    {
      status: AppointmentStatus.COMPLETED,
      phone: "0525256221",
      lastName: "לוי",
      firstName: "אברהם",
      donorId: "donorId2",
      donationStartTimeMillis: 1641992400000,
      hospital: Hospital.TEL_HASHOMER,
      appointmentId: "appointmentId2",
      bookingTimeMillis: 1641992400000,
      bloodType: BloodType.AB_PLUS,
    },
  ],
  isLoading: false,
  initialStartDate: new Date(1641027600000),
  initialEndDate: new Date(1643446800000),
};

const Template: Story<ReportsScreenProps> = (args) => {
  return <ReportsScreen {...args} />;
};

export const Default = Template.bind({});
Default.args = props;

export const OnlyOneHospital = Template.bind({});
OnlyOneHospital.args = {
  ...props,
  activeHospitalsForCoordinator: [Hospital.ASAF_HAROFE],
};

export const Loading = Template.bind({});
Loading.args = {
  ...props,
  appointmentsWithDonorDetails: [],
  isLoading: true,
};
