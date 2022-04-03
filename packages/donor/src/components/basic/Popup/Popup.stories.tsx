import { Story } from "@storybook/react";
import { useState } from "react";
import ButtonV2 from "../Button/Button";
import PopupV2, { PopupProps } from "./Popup";
import BloodBankLogo from "../../../assets/icons/blood_bank_logo.svg";

export default {
  component: PopupV2,
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
      <ButtonV2 buttonName="open" title={"פתח"} onClick={() => setOpen(true)} />
      <PopupV2 {...args} open={open} onBack={close} onApproved={close} />
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
