import { KeyboardArrowDown } from "@mui/icons-material";
import { Story } from "@storybook/react";
import { useRef, useState } from "react";
import IconButton from "../IconButton";
import Menu, { MenuItem, MenuProps } from "./Menu";

export default {
  component: Menu,
  title: "Components/Menu",
};

export const Default: Story<MenuProps> = (args) => {
  const menuAnchor = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div>
      <IconButton
        analytics={{ analyticsName: "open_menu" }}
        onClick={() => setAnchorEl(menuAnchor.current)}
        forwardRef={menuAnchor}
      >
        <KeyboardArrowDown />
        פעולות נוספות
      </IconButton>
      <Menu
        analytics={{ analyticsName: "menu" }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          key={0}
          analyticsValue="cancel_appointment"
          onClick={() => { }}
        >
          ביטול תור
        </MenuItem>
        <MenuItem
          key={1}
          analyticsValue="cancel_appointment"
          onClick={() => { }}
        >
          החלפת תור
        </MenuItem>
      </Menu>
    </div>
  );
};
