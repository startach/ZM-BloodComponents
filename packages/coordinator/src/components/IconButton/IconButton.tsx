import { IconButton as MaterialIcon, PropTypes } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export enum IconSize {
  small = "small",
  medium = "medium",
}

export interface IconButtonProps {
  size?: IconSize;
  color?: PropTypes.Color;
  iconUrl: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  tooltipText?: string;
}

function IconButton({ iconUrl, tooltipText, ...props }: IconButtonProps) {
  const IconElement = (
    <MaterialIcon {...props}>
      <img src={iconUrl} alt={tooltipText} />
    </MaterialIcon>
  );

  if (tooltipText) {
    return <Tooltip title={tooltipText}>{IconElement}</Tooltip>;
  }

  return IconElement;
}

export default IconButton;
