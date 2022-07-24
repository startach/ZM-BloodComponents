import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { MouseEvent } from "react";
import { reportClick } from "../../../Analytics";

export interface IconButtonProps extends MuiIconButtonProps {
  /** For logging and Analytics */
  buttonName: string;
}

export default function IconButton({ buttonName, ...props }: IconButtonProps) {
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    props.onClick?.(e);
    reportClick(AnalyticsButtonType.IconButton, buttonName);
  };

  return (
    <MuiIconButton
      sx={{ borderRadius: "10px" }}
      onClick={handleClick}
      {...props}
    />
  );
}
