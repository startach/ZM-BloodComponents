import { AnalyticsButtonType } from "@zm-blood-components/common";
import React from "react";
import { reportClick } from "../../../Analytics";

export interface AnchorTagProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
  /** For logging and Analytics */
  linkName: string;
}

export default function AnchorTag({
  linkName,
  href,
  ...props
}: AnchorTagProps) {
  const handleClick = () => {
    reportClick(AnalyticsButtonType.AnchorTag, linkName, href);
  };

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a onClick={handleClick} {...props} />;
}
