import {
  AnalyticsButtonType,
  AnalyticsData,
} from "@zm-blood-components/common";
import React from "react";
import { reportClick } from "../../../Analytics";

export type AnchorTagProps = {
  href: string;
  children: React.ReactNode;
  className: string;
  analytics: AnalyticsData;
};

export default function AnchorTag({
  href,
  children,
  className,
  analytics,
}: AnchorTagProps) {
  const handleClick = () => {
    if (!analytics) return;

    reportClick(AnalyticsButtonType.AnchorTag, analytics.analyticsName, href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
