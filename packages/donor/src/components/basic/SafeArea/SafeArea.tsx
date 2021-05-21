import React from "react";
import classNames from "classnames";

export interface SafeScreenProps extends React.HTMLProps<HTMLDivElement> {
  safePaddingTop?: boolean;
  safePaddingLeft?: boolean;
  safePaddingRight?: boolean;
  safePaddingBottom?: boolean;
  safePadding?: boolean;
}

const SafeArea = ({
  safePaddingTop,
  safePaddingLeft,
  safePaddingRight,
  safePaddingBottom,
  className,
  ...props
}: SafeScreenProps) => {
  const componentClassName = classNames(className, {
    //the following css classes exists in the global.scss file
    "safe-screen-padding-top": safePaddingTop,
    "safe-screen-padding-left": safePaddingLeft,
    "safe-screen-padding-right": safePaddingRight,
    "safe-screen-padding-bottom": safePaddingBottom,
  });

  return <div className={componentClassName} {...props} />;
};

export default SafeArea;
