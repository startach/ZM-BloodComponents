import React from "react";
import styles from "./SafeScreen.module.scss";
import classNames from "classnames";
export interface SafeScreenProps extends React.HTMLProps<HTMLDivElement> {
  disableTopPadding?: boolean;
  disableLeftPadding?: boolean;
  disableRightPadding?: boolean;
  disableBottomPadding?: boolean;
}

const SafeScreen = ({
  disableTopPadding,
  disableBottomPadding,
  disableLeftPadding,
  disableRightPadding,
  className,
  ...props
}: SafeScreenProps) => {
  const componentClassName = classNames(styles.component, className, {
    "safe-screen-padding-bottom": !disableBottomPadding,
    "safe-screen-padding-top": !disableTopPadding,
    "safe-screen-padding-left": !disableLeftPadding,
    "safe-screen-padding-right": !disableRightPadding,
  });

  return <div className={componentClassName} {...props} />;
};

export default SafeScreen;
