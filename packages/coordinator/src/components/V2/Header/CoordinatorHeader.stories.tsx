import { Meta, Story } from "@storybook/react";
import { CoordinatorRole, Hospital } from "@zm-blood-components/common";
import CoordinatorHeader, { CoordinatorHeaderProps } from "./CoordinatorHeader";

export default {
  component: CoordinatorHeader,
  title: "Components Coordinator Header",
} as Meta;

const getEmail = () => {
  return "johndoe@lostfound.com";
};

const props: CoordinatorHeaderProps = {
  onSignOut: () => {},
  flags: {
    isLoggedIn: true,
    showAddAppointments: true,
    showOpenAppointments: true,
    showBookedAppointments: true,
    showSearchDonors: true,
  },
  getEmail,
  coordinator: {
    name: "פלוני אלמוני",
    role: CoordinatorRole.HOSPITAL_COORDINATOR,
    activeHospitalsForCoordinator: [Hospital.BEILINSON],
  },
  currentLocationPathname: "/home",
};

const Template: Story<CoordinatorHeaderProps> = (args) => (
  <CoordinatorHeader {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  ...props,
};
