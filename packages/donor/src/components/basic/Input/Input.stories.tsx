import InputV2, { InputProps } from "./Input";
import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { InputType } from "@zm-blood-components/common";

export default {
  component: InputV2,
  title: "Components/Input",
};

const props: InputProps = {
  analytics: false,
  label: "שם פרטי",
  onSubmit: action("onSubmit"),
  onChangeText: action("onChangeText"),
};

const Template: Story<InputProps> = (args) => (
  <div style={{ marginLeft: 20, marginRight: 20 }}>
    <InputV2 {...args} />
  </div>
);

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
    <InputV2 {...props} label={"שדה מספר 1"} value={"תשובה כלשהי"} />
    <InputV2 {...props} label={"שדה מספר 2"} value={"תשובה כלשהי"} />
    <InputV2 {...props} label={"שדה מספר 3"} value={"תשובה כלשהי"} />
    <InputV2 {...props} label={"שדה מספר 4"} value={"תשובה כלשהי"} />
  </div>
);
