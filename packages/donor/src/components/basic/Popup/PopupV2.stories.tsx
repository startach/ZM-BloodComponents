import { Story } from "@storybook/react";
import PopupV2 from "./PopupV2";
import { useState } from "react";
import ButtonV2 from "../Button/ButtonV2";
import { PopupProps } from "./Popup";
import BloodBankLogo from "../../../assets/icons/blood_bank_logo.svg";

export default {
  component: PopupV2,
  title: "COMPONENTS V2/Popup V2",
};

const props = {
  titleFirst: "תודה שנרשמת!\nכמה שאלות וקבענו",
  titleSecond: "השלמת הזמנת התור תתבצע רק לאחר שנוודא שיש התאמה (:",
  buttonApproveText: "קדימה",
  goBackText: "חזרה לבחירת תורים",
};

const Template: Story<PopupProps> = (args) => {
  const [open, setOpen] = useState(false);
  const close = async () => setOpen(false);

  return (
    <div style={{ margin: 20 }}>
      <ButtonV2 title={"פתח"} onClick={() => setOpen(true)} />
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
