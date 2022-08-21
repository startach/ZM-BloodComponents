import { Story } from "@storybook/react";
import { useState } from "react";
import Button from "../basic/Button";
import ConfirmSwapAppointmentPopup from "./ConfirmSwapAppointmentPopup";

export default {
  component: ConfirmSwapAppointmentPopup,
  title: "Components/Popup/ConfirmSwapAppointmentPopup",
};

const Template: Story = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ margin: 20 }}>
      <Button
        analyticsName="open"
        title={"פתח"}
        onClick={() => setOpen(true)}
      />
      <ConfirmSwapAppointmentPopup
        isOpen={open}
        onApproved={() => {}}
        onBack={() => {}}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
