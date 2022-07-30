import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

export interface IconButtonProps extends MuiIconButtonProps {
  /** For logging and Analytics */
  analyticsName: string;
  onClick: () => void;
}

export default function IconButton({
  analyticsName,
  onClick,
  ...props
}: IconButtonProps) {
  const handleClick = () => {
    onClick();
    reportClick(AnalyticsButtonType.IconButton, analyticsName);
  };

  return <MuiIconButton onClick={handleClick} {...props} />;
}
