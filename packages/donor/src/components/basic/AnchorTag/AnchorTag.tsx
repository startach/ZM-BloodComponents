import { AnalyticsButtonType } from "@zm-blood-components/common";
import React from "react";
import { reportClick } from "../../../Analytics";

export interface AnchorTagProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  /** For logging and Analytics */
  linkName: string;
}

export default function AnchorTag({
  linkName,
  href,
  children,
  ...props
}: AnchorTagProps) {
  const handleClick = () => {
    reportClick(AnalyticsButtonType.AnchorTag, linkName, href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
