import React from "react";
import styles from "./IconButton.module.scss";
import classNames from "classnames";
import Text from "../Text";

export interface IconButtonProps {
  iconUrl?: string;
  label?: string;
  iconSize?: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  titleClassName?: string;
}

function IconButton({
  iconUrl,
  label,
  onClick,
  className,
  titleClassName,
  children,
  iconSize = 40,
}: IconButtonProps) {
  const iconSizeStr = React.useMemo(
    () => `${iconSize}${typeof iconSize === "number" ? "px" : ""}`,
    [iconSize]
  );

  const componentClassName = React.useMemo(
    () =>
      classNames({
        [styles.component]: true,
        "anim_onClick--scaleDown": onClick,
        className,
      }),
    [className, onClick]
  );

  return (
    <button className={componentClassName} onClick={onClick}>
      <img
        src={iconUrl}
        alt={`${label} button`}
        style={{ width: iconSizeStr, height: iconSizeStr }}
        className={styles.icon}
      />
      <div className={classNames(styles.titleSection, titleClassName)}>
        {label && <Text>{label}</Text>}
        {children}
      </div>
    </button>
  );
}

export default IconButton;
