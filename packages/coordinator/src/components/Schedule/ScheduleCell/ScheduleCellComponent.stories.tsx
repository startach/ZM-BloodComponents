import ScheduleCellComponent, {
  ScheduleCellComponentProps,
} from "./ScheduleCellComponent";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ScheduleCell } from "../../../utils/types";

export default {
  component: ScheduleCellComponent,
  title: "Components/Schedule/Cell",
  parameters: { layout: "padded" },
} as Meta;

const cell: ScheduleCell = {
  cellStartTime: new Date(1640001600000),
  onClick: action("onClick"),
  appointmentsCount: 3,
  bookedAppointmentsCount: 1,
};

const Template: Story<ScheduleCellComponentProps> = (args) => (
  <div style={{ width: 60 }}>
    <ScheduleCellComponent {...args} />
  </div>
);

export const FullyBooked = Template.bind({});
FullyBooked.args = {
  cell: {
    ...cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 3,
  },
};

export const PartiallyBooked = Template.bind({});
PartiallyBooked.args = {
  cell: {
    ...cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 1,
  },
};

export const AllAvailable = Template.bind({});
AllAvailable.args = {
  cell: {
    ...cell,
    appointmentsCount: 3,
    bookedAppointmentsCount: 0,
  },
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  cell: {
    ...cell,
    appointmentsCount: 0,
    bookedAppointmentsCount: 0,
  },
};
