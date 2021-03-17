import { useEffect, useState } from "react";
import {
  IconButton as MaterialIcon,
  PropTypes,
  SvgIconTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export enum IconSize {
  small = "small",
  medium = "medium",
}

export enum Icon {
  Delete = "Delete",
}

export interface IconButtonProps {
  size?: IconSize;
  color?: PropTypes.Color;
  icon: Icon;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

function IconButton({ icon, ...props }: IconButtonProps) {
  const [IconComponent, setIconComponent] = useState<
    OverridableComponent<SvgIconTypeMap<{}, "svg">>
  >();

  useEffect(() => {
    import("@material-ui/icons").then((icons) => setIconComponent(icons[icon]));
  }, [icon]);

  if (!IconComponent) return <></>;

  return (
    <MaterialIcon {...props}>
      <IconComponent />
    </MaterialIcon>
  );
}

export default IconButton;
