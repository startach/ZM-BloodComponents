import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@material-ui/core";
import { AnalyticsButtonType } from "@zm-blood-components/common";
import { reportClick } from "../../../Analytics";

export interface IconButtonProps extends MuiIconButtonProps {
  /** For logging and Analytics */
  buttonName: string;
  onClick: () => void;
}

export default function IconButton({
  buttonName,
  onClick,
  ...props
}: IconButtonProps) {
  const handleClick = () => {
    onClick();
    reportClick(AnalyticsButtonType.ListItem, buttonName);
  };

  return <MuiIconButton onClick={handleClick} {...props} />;
}
