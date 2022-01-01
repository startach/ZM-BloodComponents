import { Story } from "@storybook/react";
import { useState } from "react";
import Button from "../Button";
import { Popup, PopupProps } from "./Popup";

export default {
  component: Popup,
  title: "Components/Popup",
  parameters: { layout: "padded" },
};

const props = {
  content: "האם ברצונך להסיר תורם זה  מהתור הנוכחי?",
  primaryButtonText: "הסר תורם",
  cancelButtonText: "השאר תורם",
};

const Template: Story<PopupProps> = (args) => {
  const [open, setOpen] = useState(false);
  const handleClose = async () => setOpen(false);

  return (
    <div>
      <Button title={"פתח"} onClick={() => setOpen(true)} />
      <Popup
        {...args}
        open={open}
        onPrimaryButtonClick={handleClose}
        onCancelButtonClick={handleClose}
        onClose={handleClose}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...props,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  ...props,
  title: "שים לב",
};

export const LongText = Template.bind({});
LongText.args = {
  ...props,
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

export const CustomContent = Template.bind({});
const content = <Button title={"vhhh"} onClick={() => {}} />;
CustomContent.args = {
  ...props,
  content: content,
};

export const NoCancel = Template.bind({});
NoCancel.args = {
  content: "האם ברצונך להסיר תורם זה  מהתור הנוכחי?",
  primaryButtonText: "הסר תורם",
};
