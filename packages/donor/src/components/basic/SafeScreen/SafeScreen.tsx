import React from "react";
import styles from "./SafeScreen.module.scss";
import classNames from "classnames";
import SafeArea from "../SafeArea";

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
  return (
    <SafeArea
      safePaddingBottom={!disableBottomPadding}
      safePaddingRight={!disableLeftPadding}
      safePaddingLeft={!disableRightPadding}
      safePaddingTop={!disableTopPadding}
      className={classNames(styles.component, className)}
      {...props}
    />
  );
};

export default SafeScreen;
