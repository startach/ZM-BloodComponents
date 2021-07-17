// import { useEffect, useState } from "react";
import {
  IconButton as MaterialIcon,
  PropTypes,
  // SvgIconTypeMap,
} from "@material-ui/core";
// import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Tooltip from "@material-ui/core/Tooltip";
// import trashIcon from "../../assets/trash.svg";
// import userMinusIcon from "../../assets/user-minus.svg";

export enum IconSize {
  small = "small",
  medium = "medium",
}

// export enum Icon {
//   Delete = "Delete",
//   Clear = "Clear",
// }

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
  // let iconUrl = '';
  // () => {
  //   if (icon == Icon.Delete) iconUrl = trashIcon
  //   if (icon == Icon.Clear) iconUrl = userMinusIcon

  // }
  // const [IconComponent, setIconComponent] =
  //   useState<OverridableComponent<SvgIconTypeMap<{}, "svg">>>();

  // useEffect(() => {
  //   import("@material-ui/icons").then((icons) => setIconComponent(icons[icon]));
  // }, [icon]);

  // if (!IconComponent) return <></>;

  const IconElement = (
    <MaterialIcon {...props}>
      <img src={iconUrl} alt={"Blood Bank"} />
    </MaterialIcon>
  );

  if (tooltipText) {
    return <Tooltip title={tooltipText}>{IconElement}</Tooltip>;
  }

  return IconElement;
}

export default IconButton;
