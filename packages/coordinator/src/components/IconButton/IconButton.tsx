import { useEffect, useState } from "react";
import {
  IconButton as MaterialIcon,
  PropTypes,
  SvgIconTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Tooltip from "@material-ui/core/Tooltip";

export enum IconSize {
  small = "small",
  medium = "medium",
}

export enum Icon {
  Delete = "Delete",
  Clear = "Clear",
}

export interface IconButtonProps {
  size?: IconSize;
  color?: PropTypes.Color;
  icon: Icon;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  tooltipText?: string;
}

function IconButton({ icon, tooltipText, ...props }: IconButtonProps) {
  const [IconComponent, setIconComponent] = useState<
    OverridableComponent<SvgIconTypeMap<{}, "svg">>
  >();

  useEffect(() => {
    import("@material-ui/icons").then((icons) => setIconComponent(icons[icon]));
  }, [icon]);

  if (!IconComponent) return <></>;

  const IconElement = (
    <MaterialIcon {...props}>
      <IconComponent />
    </MaterialIcon>
  );

  if (tooltipText) {
    return <Tooltip title={tooltipText}>{IconElement}</Tooltip>;
  }

  return IconElement;
}

export default IconButton;
