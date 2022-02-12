import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import Button, { ButtonVariant } from "../Button";
import { Popup, PopupProps } from "./Popup";
import { ButtonColor } from "../Button/Button";
import styles from "../../screens/bookedDonation/BookedAppointmentScreen.module.scss";

export default {
  component: Popup,
  title: "Components/Popup",
  parameters: { layout: "padded" },
} as Meta;

const props = {
  children: "האם ברצונך להסיר תורם זה מהתור הנוכחי?",
};

const Template: Story<PopupProps> = (args) => {
  const [open, setOpen] = useState(false);
  const handleClose = async () => setOpen(false);

  return (
    <div>
      <Button title={"פתח"} onClick={() => setOpen(true)} />
      <Popup {...args} open={open} onClose={handleClose}>
        <div className={styles.popupText}>
          האם ברצונך להסיר תורם זה מהתור הנוכחי?
        </div>

        <div className={styles.PopupButtons}>
          <Button
            title={"הסר תורם"}
            onClick={handleClose}
            color={ButtonColor.secondary}
          />

          <Button
            title={"השאר תורם"}
            onClick={handleClose}
            variant={ButtonVariant.outlined}
          />
        </div>
      </Popup>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const LongText = Template.bind({});
LongText.args = {
  ...props,
  children:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};
