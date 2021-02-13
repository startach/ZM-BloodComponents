import React from "react";
import styles from "./IconButton.module.scss";
import classNames from "classnames";
import Text from "../Text";

export interface IconButtonProps {
  iconSrc: string;
  label?: string;
  onClick?: () => void;
  className?: string;
  iconSize?: string | number;
}

function IconButton({
  iconSrc,
  label,
  onClick,
  className,
  iconSize = 20,
}: IconButtonProps) {
  const iconSizeStr = React.useMemo(
    () => `${iconSize}${typeof iconSize === "number" ? "px" : ""}`,
    [iconSize]
  );

  return (
    <button
      className={classNames(styles.component, className)}
      onClick={onClick}
    >
      <img
        src={iconSrc}
        alt={`${label} button`}
        style={{ width: iconSizeStr, height: iconSizeStr }}
      />
      <Text>{label}</Text>
    </button>
  );
}

export default IconButton;
