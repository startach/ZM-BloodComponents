import { KeyboardArrowDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Story } from "@storybook/react";
import { useState } from "react";
import IconButton from "../IconButton";
import Menu, { MenuItem, MenuProps } from "./Menu";

export default {
  component: Menu,
  title: "Components/Menu",
};

export const Default: Story<MenuProps> = (args) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div>
      <IconButton
        analyticsName="open_menu"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <KeyboardArrowDown />
        <Typography variant="subtitle2">פעולות נוספות</Typography>
      </IconButton>
      <Menu
        analyticsName={"menu"}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          key={0}
          analyticsValue="cancel_appointment"
          onClick={() => {}}
        >
          <Typography variant="body2">ביטול תור</Typography>
        </MenuItem>
        <MenuItem
          key={1}
          analyticsValue="cancel_appointment"
          onClick={() => {}}
        >
          <Typography variant="body2">החלפת תור</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
