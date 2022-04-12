import Input, { InputProps } from "./Input";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { InputType } from "@zm-blood-components/common";

export default {
  component: Input,
  title: "Components/Input",
  parameters: { layout: "padded" },
} as Meta;

const props: InputProps = {
  label: "שם פרטי",

  onSubmit: action("onSubmit"),
  onChangeText: action("onChangeText"),
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const Error = Template.bind({});
Error.args = {
  ...props,
  errorMessage: "שם פרטי לא יכול להכיל מספרים",
  value: "משה 123",
};

export const Password = Template.bind({});
Password.args = {
  ...props,
  label: "סיסמה",
  type: InputType.Password,
  value: "password1234",
};

export const MultipleInput = () => (
  <div style={{ marginLeft: 20, marginRight: 20 }}>
    <Input {...props} label={"שדה מספר 1"} value={"תשובה כלשהי"} />
    <Input {...props} label={"שדה מספר 2"} value={"תשובה כלשהי"} />
    <Input {...props} label={"שדה מספר 3"} value={"תשובה כלשהי"} />
    <Input {...props} label={"שדה מספר 4"} value={"תשובה כלשהי"} />
  </div>
);
