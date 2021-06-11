import InputV2 from "./InputV2";
import { action } from "@storybook/addon-actions";
import { InputProps } from "./Input";
import { Story } from "@storybook/react";
import Visibility from "@material-ui/icons/Visibility";

export default {
  component: InputV2,
  title: "COMPONENTS V2/Input V2",
};

const props: InputProps = {
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

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...props,
  label: "סיסמה",
  endIcon: <Visibility />,
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
  type: "password",
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
