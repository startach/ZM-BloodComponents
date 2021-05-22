import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GroupsTable, { GroupTableProps } from "./GroupTable";

export default {
  component: GroupsTable,
  title: "Components Group Table",
};

const baseArgs : GroupTableProps = {
  title: "טבלה",
  variant: ButtonVariant.contained,
  onClick: action("onClick"),
};

export const Template: Story<TableProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Basic = Template.bind({});
Basic.args = baseArgs;