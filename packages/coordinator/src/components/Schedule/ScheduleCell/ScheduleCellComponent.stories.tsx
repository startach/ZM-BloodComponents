import ScheduleCellComponent, {
  ScheduleCellComponentProps,
} from "./ScheduleCellComponent";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  component: ScheduleCellComponent,
  title: "Components/Schedule/Cell",
  parameters: { layout: "padded" },
} as Meta;

const props: ScheduleCellComponentProps = {
  cell: {
    cellStartTime: new Date(1640001600000),
    onClick: action("onClick"),
    appointmentsCount: 3,
    bookedAppointmentsCount: 1,
  },
};

const Template: Story<ScheduleCellComponentProps> = (args) => (
  <div style={{ width: 60 }}>
    <ScheduleCellComponent {...args} />
  </div>
);

export const FullyBooked = Template.bind({});
FullyBooked.args = {
  cell: {
    ...props.cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 3,
  },
};

export const PartiallyBooked = Template.bind({});
PartiallyBooked.args = {
  cell: {
    ...props.cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 1,
  },
};

export const AllAvailable = Template.bind({});
AllAvailable.args = {
  cell: {
    ...props.cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 0,
  },
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  cell: {
    ...props.cell,
    appointmentsCount: 0,
    bookedAppointmentsCount: 0,
  },
};
