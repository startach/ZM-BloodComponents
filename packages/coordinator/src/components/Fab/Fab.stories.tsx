import { Meta, Story } from "@storybook/react";
import Fab, { FabProps } from "./Fab";
import { action } from "@storybook/addon-actions";
import AddIcon from "@mui/icons-material/Add";

export default {
  component: Fab,
  title: "Components/Fab",
  parameters: { layout: "fullscreen" },
} as Meta;

export const Default: Story<FabProps> = (args) => {
  return (
    <Fab onClick={action("onClick")}>
      <AddIcon />
      <div style={{ marginRight: 5, fontSize: 16 }}>הוסף תור</div>
    </Fab>
  );
};
