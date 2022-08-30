import { Story } from "@storybook/react";
import { useState } from "react";
import Button from "../Button/Button";
import Popup, { PopupProps } from "./Popup";
import BloodBankLogo from "../../../assets/icons/blood_bank_logo.svg";

export default {
  component: Popup,
  title: "Components/Popup",
};

const props = {
  title: "תודה שנרשמת!\nכמה שאלות וקבענו",
  content: "השלמת הזמנת התור תתבצע רק לאחר שנוודא שיש התאמה (:",
  buttonApproveText: "קדימה",
  goBackText: "חזרה לבחירת תורים",
};

const Template: Story<PopupProps> = (args) => {
  const [open, setOpen] = useState(false);
  const close = async () => setOpen(false);

  return (
    <div style={{ margin: 20 }}>
      <Button analytics={false} title={"פתח"} onClick={() => setOpen(true)} />
      <Popup {...args} open={open} onBack={close} onApproved={close} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...props,
  image: BloodBankLogo,
};
