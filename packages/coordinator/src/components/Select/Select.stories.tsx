import Select, { SelectProps } from "./Select"
import { Meta } from "@storybook/react";


import { action } from "@storybook/addon-actions";
import { SelectOption } from "@zm-blood-components/common";
import _ from "lodash";

export default {
    component: Select,
    title: "Components/Select",
    parameters: { layout: "padded" },
} as Meta;

const options: SelectOption<number>[] = _.range(10).map((n) => ({
    label: n + 1 + "",
    value: n + 1,
    key: n + "",
  }));

const props: SelectProps<number> = {
    onChange: (num: number) => {},
    options: options,
};

export const Default = (args: SelectProps<number>) => {
return (
    <Select {...args} />
);
};

Default.args = props;
  